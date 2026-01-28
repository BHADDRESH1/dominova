import type { Request, Response } from "express";
import { db } from "../utils/db";
import { employees } from "../models/schema";
import { eq, desc } from "drizzle-orm";

// Get all employees
export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const result = await db
      .select()
      .from(employees)
      .orderBy(desc(employees.createdAt));
    res.json(result);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

// Get employee by ID
export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db
      .select()
      .from(employees)
      .where(eq(employees.id, id));

    if (result.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ error: "Failed to fetch employee" });
  }
};

// Create employee
export const createEmployee = async (req: Request, res: Response) => {
  try {
    const {
      employeeIdCode,
      fullName,
      designation,
      department,
      dateOfJoining,
      employmentType,
      email,
      contactNumber,
      status,
    } = req.body;

    const result = await db
      .insert(employees)
      .values({
        employeeIdCode,
        fullName,
        designation,
        department,
        dateOfJoining,
        employmentType,
        email,
        contactNumber,
        status: status || "active",
      })
      .returning();

    res.status(201).json(result[0]);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Failed to create employee" });
  }
};

// Update employee
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const result = await db
      .update(employees)
      .set(updates)
      .where(eq(employees.id, id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Failed to update employee" });
  }
};

// Delete employee
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await db
      .delete(employees)
      .where(eq(employees.id, id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};
