import type { Request, Response } from "express";
import { db } from "../utils/db";
import { ambassadorDetails, profiles, students } from "../models/schema";
import { eq, desc, sql } from "drizzle-orm";

// Get all ambassadors with profile info
export const getAllAmbassadors = async (req: Request, res: Response) => {
  try {
    const result = await db
      .select({
        id: ambassadorDetails.id,
        profileId: ambassadorDetails.profileId,
        collegeName: ambassadorDetails.collegeName,
        course: ambassadorDetails.course,
        yearOfStudy: ambassadorDetails.yearOfStudy,
        referralCode: ambassadorDetails.referralCode,
        status: ambassadorDetails.status,
        createdAt: ambassadorDetails.createdAt,
        fullName: profiles.fullName,
        email: profiles.email,
      })
      .from(ambassadorDetails)
      .leftJoin(profiles, eq(ambassadorDetails.profileId, profiles.id))
      .orderBy(desc(ambassadorDetails.createdAt));

    // Format for frontend
    const formatted = result.map((amb) => ({
      id: amb.id,
      name: amb.fullName || "Unknown",
      email: amb.email || "N/A",
      university: amb.collegeName,
      course: amb.course,
      yearOfStudy: amb.yearOfStudy,
      referralCode: amb.referralCode,
      status: amb.status === "active" ? "Active" : "Inactive",
      referrals: 0, // Will be calculated separately
      earnings: "₹0",
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching ambassadors:", error);
    res.status(500).json({ error: "Failed to fetch ambassadors" });
  }
};

// Get ambassador by ID
export const getAmbassadorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db
      .select()
      .from(ambassadorDetails)
      .leftJoin(profiles, eq(ambassadorDetails.profileId, profiles.id))
      .where(eq(ambassadorDetails.id, id));

    if (result.length === 0) {
      return res.status(404).json({ error: "Ambassador not found" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching ambassador:", error);
    res.status(500).json({ error: "Failed to fetch ambassador" });
  }
};

// Get ambassador stats (referrals count, earnings)
export const getAmbassadorStats = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Count students referred by this ambassador
    const referralCount = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(students)
      .where(eq(students.referredById, id));

    // Count paid students
    const paidCount = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(students)
      .where(eq(students.referredById, id))
      .where(eq(students.status, "paid"));

    res.json({
      referrals: referralCount[0]?.count || 0,
      paidStudents: paidCount[0]?.count || 0,
      earnings: 0, // Calculate based on incentive slabs
    });
  } catch (error) {
    console.error("Error fetching ambassador stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

// Create ambassador
export const createAmbassador = async (req: Request, res: Response) => {
  try {
    const { profileId, collegeName, course, yearOfStudy } = req.body;

    // Generate referral code
    const referralCode = `AMB-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`;

    const result = await db
      .insert(ambassadorDetails)
      .values({
        profileId,
        collegeName,
        course,
        yearOfStudy,
        referralCode,
        status: "active",
      })
      .returning();

    res.status(201).json(result[0]);
  } catch (error) {
    console.error("Error creating ambassador:", error);
    res.status(500).json({ error: "Failed to create ambassador" });
  }
};

// Update ambassador
export const updateAmbassador = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const result = await db
      .update(ambassadorDetails)
      .set(updates)
      .where(eq(ambassadorDetails.id, id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "Ambassador not found" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Error updating ambassador:", error);
    res.status(500).json({ error: "Failed to update ambassador" });
  }
};

// Delete ambassador
export const deleteAmbassador = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await db
      .delete(ambassadorDetails)
      .where(eq(ambassadorDetails.id, id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "Ambassador not found" });
    }

    res.json({ message: "Ambassador deleted successfully" });
  } catch (error) {
    console.error("Error deleting ambassador:", error);
    res.status(500).json({ error: "Failed to delete ambassador" });
  }
};
