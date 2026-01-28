import type { Request, Response } from "express";
import { db } from "../utils/db";
import {
  employees,
  ambassadorDetails,
  students,
  salaries,
  profiles,
} from "../models/schema";
import { eq, desc, sql, and } from "drizzle-orm";

// ==================== OWNER DASHBOARD ====================

export const getOwnerStats = async (req: Request, res: Response) => {
  try {
    // Get counts in parallel
    const [ambassadorCount, employeeCount, revenueResult, pendingPayouts] =
      await Promise.all([
        db
          .select({ count: sql<number>`count(*)::int` })
          .from(ambassadorDetails),
        db
          .select({ count: sql<number>`count(*)::int` })
          .from(employees)
          .where(eq(employees.status, "active")),
        db
          .select({
            total: sql<number>`coalesce(sum(${students.amountPaid}), 0)::numeric`,
          })
          .from(students)
          .where(eq(students.status, "paid")),
        db
          .select({
            total: sql<number>`coalesce(sum(${salaries.amount}), 0)::numeric`,
          })
          .from(salaries)
          .where(eq(salaries.paymentStatus, "pending")),
      ]);

    // Active ambassadors
    const activeAmbassadors = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(ambassadorDetails)
      .where(eq(ambassadorDetails.status, "active"));

    res.json({
      totalAmbassadors: ambassadorCount[0]?.count || 0,
      activeAmbassadors: activeAmbassadors[0]?.count || 0,
      totalEmployees: employeeCount[0]?.count || 0,
      totalRevenue: Number(revenueResult[0]?.total) || 0,
      pendingPayouts: Number(pendingPayouts[0]?.total) || 0,
      totalIncentivesPaid: 0, // TODO: Calculate from ambassador payouts
      totalSalariesPaid: 0, // TODO: Calculate from paid salaries
    });
  } catch (error) {
    console.error("Error fetching owner stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

export const getTopAmbassadors = async (req: Request, res: Response) => {
  try {
    // Get ambassadors with their referral counts
    const result = await db
      .select({
        ambassadorId: ambassadorDetails.id,
        fullName: profiles.fullName,
        referrals: sql<number>`count(${students.id})::int`,
      })
      .from(ambassadorDetails)
      .leftJoin(profiles, eq(ambassadorDetails.profileId, profiles.id))
      .leftJoin(students, eq(students.referredById, ambassadorDetails.id))
      .groupBy(ambassadorDetails.id, profiles.fullName)
      .orderBy(desc(sql`count(${students.id})`))
      .limit(5);

    const formatted = result.map((amb) => ({
      name: amb.fullName || "Unknown Ambassador",
      referrals: amb.referrals || 0,
      earnings: (amb.referrals || 0) * 200, // Simple calculation, adjust as needed
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching top ambassadors:", error);
    res.status(500).json({ error: "Failed to fetch top ambassadors" });
  }
};

export const getRecentActivity = async (req: Request, res: Response) => {
  try {
    // Get recent students as activity
    const recentStudents = await db
      .select({
        action: sql<string>`'New referral added'`,
        user: students.fullName,
        createdAt: students.createdAt,
      })
      .from(students)
      .orderBy(desc(students.createdAt))
      .limit(5);

    const formatted = recentStudents.map((item) => ({
      action: item.action,
      user: item.user,
      time: getRelativeTime(new Date(item.createdAt)),
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    res.status(500).json({ error: "Failed to fetch activity" });
  }
};

// ==================== ADMIN DASHBOARD ====================

export const getAdminStats = async (req: Request, res: Response) => {
  try {
    const [ambassadorCount, pendingVerifications, pendingOfferLetters] =
      await Promise.all([
        db
          .select({ count: sql<number>`count(*)::int` })
          .from(ambassadorDetails),
        db
          .select({ count: sql<number>`count(*)::int` })
          .from(students)
          .where(eq(students.status, "pending")),
        db
          .select({ count: sql<number>`count(*)::int` })
          .from(students)
          .where(eq(students.status, "paid")),
      ]);

    res.json({
      totalAmbassadors: ambassadorCount[0]?.count || 0,
      pendingVerifications: pendingVerifications[0]?.count || 0,
      pendingOfferLetters: pendingOfferLetters[0]?.count || 0,
      completedToday: 0, // TODO: Calculate based on today's date
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

export const getPendingTasks = async (req: Request, res: Response) => {
  try {
    // Pending verifications
    const verifications = await db
      .select()
      .from(students)
      .where(eq(students.status, "pending"))
      .limit(10);

    // Pending offer letters
    const offerLetters = await db
      .select()
      .from(students)
      .where(eq(students.status, "paid"))
      .limit(10);

    res.json({ verifications, offerLetters });
  } catch (error) {
    console.error("Error fetching pending tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// ==================== AMBASSADOR DASHBOARD ====================

export const getAmbassadorDashboardStats = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    // Get student counts
    const [totalStudents, paidStudents, pendingStudents] = await Promise.all([
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(students)
        .where(eq(students.referredById, id)),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(students)
        .where(and(eq(students.referredById, id), eq(students.status, "paid"))),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(students)
        .where(
          and(eq(students.referredById, id), eq(students.status, "pending")),
        ),
    ]);

    const paidCount = paidStudents[0]?.count || 0;

    // Calculate earnings based on slabs
    let earnings = 0;
    if (paidCount <= 5) earnings = paidCount * 100;
    else if (paidCount <= 10) earnings = 5 * 100 + (paidCount - 5) * 150;
    else if (paidCount <= 20)
      earnings = 5 * 100 + 5 * 150 + (paidCount - 10) * 200;
    else earnings = 5 * 100 + 5 * 150 + 10 * 200 + (paidCount - 20) * 250;

    res.json({
      totalStudents: totalStudents[0]?.count || 0,
      paidStudents: paidCount,
      pendingStudents: pendingStudents[0]?.count || 0,
      totalEarnings: earnings,
      currentRank: 0, // TODO: Calculate rank
      nextSlabTarget:
        paidCount < 5 ? 5 : paidCount < 10 ? 10 : paidCount < 20 ? 20 : 30,
    });
  } catch (error) {
    console.error("Error fetching ambassador stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const result = await db
      .select({
        ambassadorId: ambassadorDetails.id,
        fullName: profiles.fullName,
        referrals: sql<number>`count(${students.id})::int`,
      })
      .from(ambassadorDetails)
      .leftJoin(profiles, eq(ambassadorDetails.profileId, profiles.id))
      .leftJoin(
        students,
        and(
          eq(students.referredById, ambassadorDetails.id),
          eq(students.status, "paid"),
        ),
      )
      .groupBy(ambassadorDetails.id, profiles.fullName)
      .orderBy(desc(sql`count(${students.id})`))
      .limit(10);

    const formatted = result.map((amb, index) => ({
      rank: index + 1,
      name: amb.fullName || "Unknown",
      referrals: amb.referrals || 0,
      points: (amb.referrals || 0) * 100,
      avatar: (amb.fullName || "UN").substring(0, 2).toUpperCase(),
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};

// Helper function for relative time
function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${diffDays} days ago`;
}
