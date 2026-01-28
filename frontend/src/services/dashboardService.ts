const API_BASE = "/api/dashboard";

export const dashboardService = {
  async getStats() {
    const res = await fetch(`${API_BASE}/stats`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch dashboard stats");
    return res.json();
  },

  async getRecentVerifications() {
    const res = await fetch(`${API_BASE}/recent-verifications`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch recent verifications");
    return res.json();
  },

  async getPendingTasks() {
    const res = await fetch(`${API_BASE}/pending-tasks`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch pending tasks");
    return res.json();
  },
};
