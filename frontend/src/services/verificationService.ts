const API_BASE = "/api/students";

export const verificationService = {
  async getPendingVerifications() {
    const res = await fetch(`${API_BASE}?status=pending`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch pending verifications");
    return res.json();
  },

  async approveVerification(studentId: string) {
    const res = await fetch(`${API_BASE}/${studentId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "paid" }),
    });
    if (!res.ok) throw new Error("Failed to approve verification");
  },

  async rejectVerification(studentId: string) {
    const res = await fetch(`${API_BASE}/${studentId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to reject verification");
  },

  async getOfferReadyStudents() {
    const res = await fetch(`${API_BASE}?status=paid`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch offer ready students");
    return res.json();
  },

  async sendOfferLetter(studentId: string) {
    const res = await fetch(`${API_BASE}/${studentId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "offer_letter_sent" }),
    });
    if (!res.ok) throw new Error("Failed to update offer letter status");
  },
};
