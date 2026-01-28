
import { supabase } from "@/integrations/supabase/client";

export const dashboardService = {
    async getStats() {
        // Parallelize these if possible, or use a stored procedure for better performance later.
        const [
            { count: totalAmbassadors },
            { count: pendingVerifications },
            { count: pendingOfferLetters }, // Assuming status 'offer_letter_sent' implies completed, so maybe we need a 'pending' state? Or check students table logic.
            // Actually, based on logic, 'pending' students might be those needing verification.
            // 'offer_letter_sent' is a status.
            // Let's assume pending verifications are students with status 'pending' or 'verified' but no payment?
            // Re-reading logic:
            // Verifications: Student payment_proof_url is present, status is 'pending'
            // Offer Letters: Student status is 'paid' (ready for offer letter)?

        ] = await Promise.all([
            supabase.from('ambassador_details').select('*', { count: 'exact', head: true }),
            supabase.from('students').select('*', { count: 'exact', head: true }).eq('status', 'pending'), // Pending Verification
            supabase.from('students').select('*', { count: 'exact', head: true }).eq('status', 'paid'), // Ready for Offer Letter
        ]);

        // For "Completed Today", we'd need checks on created_at or updated_at.
        // Let's stick to basic counts for now.

        return {
            totalAmbassadors: totalAmbassadors || 0,
            pendingVerifications: pendingVerifications || 0,
            pendingOfferLetters: pendingOfferLetters || 0,
            completedToday: 0 // Placeholder for now or implement complex query
        };
    },

    async getRecentVerifications() {
        const { data, error } = await supabase
            .from('students')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);

        if (error) throw error;
        return data;
    },

    async getPendingTasks() {
        // Fetch pending verifications
        const { data: verifications } = await supabase
            .from('students')
            .select('*, ambassador_details(profile_id)') // Join to get ambassador info if needed
            .eq('status', 'pending');

        // Fetch pending offer letters (status = 'paid')
        const { data: offerLetters } = await supabase
            .from('students')
            .select('*')
            .eq('status', 'paid');

        return {
            verifications: verifications || [],
            offerLetters: offerLetters || []
        };
    }
};
