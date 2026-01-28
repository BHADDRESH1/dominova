
import { supabase } from "@/integrations/supabase/client";

export const ambassadorService = {
    async getAllAmbassadors() {
        // Determine source of truth: Profile or direct fields
        const { data, error } = await supabase
            .from('ambassador_details')
            .select('*, profiles(full_name, email, role)')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return data?.map((item: any) => ({
            id: item.id,
            // Use profile data if linked, otherwise fallback to manual fields
            name: item.profiles?.full_name || item.full_name || 'Unknown',
            email: item.profiles?.email || item.email || 'N/A',
            university: item.college_name,
            status: item.status,
            referrals: 0,
            earnings: "₹0"
        }));
    },

    async createAmbassador(data: { full_name: string; email: string; college_name: string }) {
        // Basic insert without profile_id
        const { data: newAmbassador, error } = await supabase
            .from('ambassador_details')
            .insert([{
                full_name: data.full_name,
                email: data.email,
                college_name: data.college_name,
                referral_code: `AMB-${Math.floor(Math.random() * 10000)}`, // Generate simple code
                status: 'active'
            }])
            .select()
            .single();

        if (error) throw error;
        return newAmbassador;
    },

    async getAmbassadorStats(ambassadorId: string) {
        const { count } = await supabase
            .from('students')
            .select('*', { count: 'exact', head: true })
            .eq('referred_by_id', ambassadorId);

        return {
            referrals: count || 0,
            earnings: 0
        };
    }
};
