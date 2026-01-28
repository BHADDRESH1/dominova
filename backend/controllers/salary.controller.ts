import type { Request, Response } from "express";
import { db } from "../utils/db";
import { salaries, employees } from "../models/schema";
import { eq, and, desc, sql } from "drizzle-orm";

// Get all salaries
export const getAllSalaries = async (req: Request, res: Response) => {
  try {
    const result = await db
      .select({
        id: salaries.id,
        employeeId: salaries.employeeId,
        amount: salaries.amount,
        baseSalary: salaries.baseSalary,
        bonuses: salaries.bonuses,
        deductions: salaries.deductions,
        paymentStatus: salaries.paymentStatus,
        paymentDate: salaries.paymentDate,
        month: salaries.month,
        year: salaries.year,
        notes: salaries.notes,
        employeeName: employees.fullName,
        employeeIdCode: employees.employeeIdCode,
      })
      .from(salaries)
      .leftJoin(employees, eq(salaries.employeeId, employees.id))
      .orderBy(desc(salaries.createdAt));

    res.json(result);
  } catch (error) {
    console.error("Error fetching salaries:", error);
    res.status(500).json({ error: "Failed to fetch salaries" });
  }
};

// Get salaries by month
export const getSalariesByMonth = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.params;

    const result = await db
      .select({
        id: salaries.id,
        employeeId: salaries.employeeId,
        amount: salaries.amount,
        baseSalary: salaries.baseSalary,
        bonuses: salaries.bonuses,
        deductions: salaries.deductions,
        paymentStatus: salaries.paymentStatus,
        paymentDate: salaries.paymentDate,
        month: salaries.month,
        year: salaries.year,
        notes: salaries.notes,
        employeeName: employees.fullName,
        employeeIdCode: employees.employeeIdCode,
      })
      .from(salaries)
      .leftJoin(employees, eq(salaries.employeeId, employees.id))
      .where(and(eq(salaries.month, month), eq(salaries.year, parseInt(year))));

    res.json(result);
  } catch (error) {
    console.error("Error fetching salaries:", error);
    res.status(500).json({ error: "Failed to fetch salaries" });
  }
};

// Get salary stats for a month
export const getSalaryStats = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.params;

    const result = await db
      .select({
        paymentStatus: salaries.paymentStatus,
        totalAmount: sql<number>`sum(${salaries.amount})::numeric`,
        count: sql<number>`count(*)::int`,
      })
      .from(salaries)
      .where(and(eq(salaries.month, month), eq(salaries.year, parseInt(year))))
      .groupBy(salaries.paymentStatus);

    const stats = {
      totalPaid: 0,
      pendingAmount: 0,
      employeesPaid: 0,
      employeesPending: 0,
    };

    result.forEach((row) => {
      if (row.paymentStatus === "paid") {
        stats.totalPaid = Number(row.totalAmount) || 0;
        stats.employeesPaid = row.count || 0;
      } else if (row.paymentStatus === "pending") {
        stats.pendingAmount = Number(row.totalAmount) || 0;
        stats.employeesPending = row.count || 0;
      }
    });

    res.json(stats);
  } catch (error) {
    console.error("Error fetching salary stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

// Get salary by ID
export const getSalaryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db.select().from(salaries).where(eq(salaries.id, id));

    if (result.length === 0) {
      return res.status(404).json({ error: "Salary record not found" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching salary:", error);
    res.status(500).json({ error: "Failed to fetch salary" });
  }
};

// Create salary record
export const createSalary = async (req: Request, res: Response) => {
  try {
    const {
      employeeId,
      amount,
      baseSalary,
      bonuses,
      deductions,
      month,
      year,
      notes,
    } = req.body;

    const result = await db
      .insert(salaries)
      .values({
        employeeId,
        amount,
        baseSalary,
        bonuses,
        deductions,
        month,
        year,
        notes,
        paymentStatus: "pending",
      })
      .returning();

    res.status(201).json(result[0]);
  } catch (error) {
    console.error("Error creating salary:", error);
    res.status(500).json({ error: "Failed to create salary record" });
  }
};

// Update salary record
export const updateSalary = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const result = await db
      .update(salaries)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(salaries.id, id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "Salary record not found" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Error updating salary:", error);
    res.status(500).json({ error: "Failed to update salary" });
  }
};

// Update payment status
export const updatePaymentStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, paymentDate } = req.body;

    const result = await db
      .update(salaries)
      .set({
        paymentStatus: status,
        paymentDate:
          status === "paid"
            ? paymentDate || new Date().toISOString().split("T")[0]
            : null,
        updatedAt: new Date(),
      })
      .where(eq(salaries.id, id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "Salary record not found" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ error: "Failed to update status" });
  }
};

// Delete salary record
export const deleteSalary = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await db
      .delete(salaries)
      .where(eq(salaries.id, id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "Salary record not found" });
    }

    res.json({ message: "Salary record deleted successfully" });
  } catch (error) {
    console.error("Error deleting salary:", error);
    res.status(500).json({ error: "Failed to delete salary" });
  }
};
