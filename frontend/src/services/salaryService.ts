const API_BASE = "/api/salaries";

export const salaryService = {
  async getAllSalaries() {
    const res = await fetch(API_BASE, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch salaries");
    return res.json();
  },

  async getSalariesByMonth(month: string, year: number) {
    const res = await fetch(`${API_BASE}/month/${month}/${year}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch salaries by month");
    return res.json();
  },

  async getSalaryStats(month: string, year: number) {
    const res = await fetch(`${API_BASE}/stats/${month}/${year}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch salary stats");
    return res.json();
  },
};
