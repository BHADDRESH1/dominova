const API_BASE = "/api/email";

export const emailService = {
  async sendOfferLetter(email: string, candidateName: string) {
    const res = await fetch(`${API_BASE}/offer-letter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, candidateName }),
    });
    if (!res.ok) throw new Error("Failed to send offer letter");
    return true;
  },
};
