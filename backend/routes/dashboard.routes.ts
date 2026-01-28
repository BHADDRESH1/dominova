import { Router } from "express";
import * as dashboardController from "../controllers/dashboard.controller";

const router = Router();

// Owner dashboard stats
router.get("/owner/stats", dashboardController.getOwnerStats);
router.get("/owner/top-ambassadors", dashboardController.getTopAmbassadors);
router.get("/owner/recent-activity", dashboardController.getRecentActivity);

// Admin dashboard stats
router.get("/admin/stats", dashboardController.getAdminStats);
router.get("/admin/pending-tasks", dashboardController.getPendingTasks);

// Ambassador dashboard stats
router.get(
  "/ambassador/:id/stats",
  dashboardController.getAmbassadorDashboardStats,
);
router.get("/leaderboard", dashboardController.getLeaderboard);

export default router;
