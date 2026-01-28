
export const emailService = {
    async sendOfferLetter(email: string, candidateName: string) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock success
        console.log(`[Mock Email Service] Sent offer letter to ${email} for ${candidateName}`);

        // In a real app, this would call a Supabase Edge Function:
        // const { data, error } = await supabase.functions.invoke('send-offer-letter', { body: { email, name } })

        return true;
    }
};
