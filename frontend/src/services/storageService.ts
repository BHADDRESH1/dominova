
import { supabase } from "@/integrations/supabase/client";

export const storageService = {
    async uploadPaymentProof(file: File) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await supabase.storage
            .from('payment_proofs')
            .upload(filePath, file);

        if (error) {
            console.error('Error uploading file:', error);
            throw error;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('payment_proofs')
            .getPublicUrl(filePath);

        return publicUrl;
    }
};
