import type { Request, Response } from "express";
import { db } from "../utils/db";
import { students, ambassadorDetails } from "../models/schema";
import { eq, desc } from "drizzle-orm";

// Get all students
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await db
      .select()
      .from(students)
      .leftJoin(
        ambassadorDetails,
        eq(students.referredById, ambassadorDetails.id),
      )
      .orderBy(desc(students.createdAt));

    res.json(result);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

// Get students by ambassador
export const getStudentsByAmbassador = async (req: Request, res: Response) => {
  try {
    const { ambassadorId } = req.params;

    const result = await db
      .select()
      .from(students)
      .where(eq(students.referredById, ambassadorId))
      .orderBy(desc(students.createdAt));

    res.json(result);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

// Get student by ID
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db.select().from(students).where(eq(students.id, id));

    if (result.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Failed to fetch student" });
  }
};

// Create student (referral)
export const createStudent = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      phone,
      courseInterested,
      referredById,
      amountPaid,
    } = req.body;

    console.log("[createStudent] Incoming data:", req.body);

    // Validate referredById exists
    if (!referredById) {
      return res.status(400).json({ error: "referredById is required" });
    }

    const ambassador = await db
      .select()
      .from(ambassadorDetails)
      .where(eq(ambassadorDetails.id, referredById));
    if (!ambassador.length) {
      return res
        .status(400)
        .json({ error: "Ambassador not found for referredById" });
    }

    const result = await db
      .insert(students)
      .values({
        fullName,
        email,
        phone,
        courseInterested,
        referredById,
        amountPaid,
        status: "pending",
      })
      .returning();

    res.status(201).json(result[0]);
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Failed to create student" });
  }
};

// Update student
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const result = await db
      .update(students)
      .set(updates)
      .where(eq(students.id, id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Failed to update student" });
  }
};

// Update student status
export const updateStudentStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await db
      .update(students)
      .set({ status })
      .where(eq(students.id, id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Error updating student status:", error);
    res.status(500).json({ error: "Failed to update status" });
  }
};

// Delete student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await db
      .delete(students)
      .where(eq(students.id, id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Failed to delete student" });
  }
};
