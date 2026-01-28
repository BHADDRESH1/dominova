const API_BASE = import.meta.env.VITE_BACKEND_URL
  ? `${import.meta.env.VITE_BACKEND_URL}/api/upload`
  : "http://localhost:3000/api/upload";

export const storageService = {
  async uploadPaymentProof(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE}/payment-proof`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to upload payment proof");
    const data = await res.json();
    return data.url || data.publicUrl || data.path || null;
  },
};
