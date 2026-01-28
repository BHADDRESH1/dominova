const API_BASE = "/api/ambassadors";

export const ambassadorService = {
  async getAllAmbassadors() {
    const res = await fetch(API_BASE, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch ambassadors");
    return res.json();
  },

  async createAmbassador(data: {
    full_name: string;
    email: string;
    college_name: string;
  }) {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create ambassador");
    return res.json();
  },

  async getAmbassadorStats(ambassadorId: string) {
    const res = await fetch(`${API_BASE}/${ambassadorId}/stats`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch ambassador stats");
    return res.json();
  },
};
