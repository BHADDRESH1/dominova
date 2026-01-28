import type { Request, Response } from "express";
import { db } from "../utils/db";
import { profiles } from "../models/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import type { CookieOptions } from "express";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "dev-access";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "dev-refresh";

const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

function signAccess(payload: object) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

function signRefresh(payload: object) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

function setAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken: string,
) {
  res.cookie("access_token", accessToken, {
    ...baseCookieOptions,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refresh_token", refreshToken, {
    ...baseCookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body as {
      fullName: string;
      email: string;
      password: string;
    };

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ error: "fullName, email, password required" });
    }

    const existing = await db
      .select()
      .from(profiles)
      .where(eq(profiles.email, email));
    if (existing.length > 0) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [created] = await db
      .insert(profiles)
      .values({
        id: crypto.randomUUID(),
        email,
        fullName,
        role: "ambassador",
        passwordHash,
      })
      .returning();

    if (!created) {
      return res.status(500).json({ error: "Failed to create user" });
    }

    const access = signAccess({
      sub: created.id,
      email: created.email,
      role: created.role,
    });
    const refresh = signRefresh({
      sub: created.id,
      email: created.email,
      role: created.role,
    });
    setAuthCookies(res, access, refresh);

    res.status(201).json({
      user: {
        id: created.id,
        email: created.email,
        fullName: created.fullName,
        role: created.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Failed to signup" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) {
      return res.status(400).json({ error: "email and password required" });
    }

    const rows = await db
      .select()
      .from(profiles)
      .where(eq(profiles.email, email));
    if (rows.length === 0 || !rows[0].passwordHash) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = rows[0] as any;
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const access = signAccess({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    const refresh = signRefresh({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    setAuthCookies(res, access, refresh);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Failed to login" });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.["refresh_token"];
    if (!token) return res.status(401).json({ error: "Missing refresh token" });
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as any;
    const access = signAccess({
      sub: decoded.sub,
      email: decoded.email,
      role: decoded.role,
    });
    res.cookie("access_token", access, {
      ...baseCookieOptions,
      maxAge: 15 * 60 * 1000,
    });
    res.json({ success: true });
  } catch (e) {
    return res.status(401).json({ error: "Invalid refresh token" });
  }
};
