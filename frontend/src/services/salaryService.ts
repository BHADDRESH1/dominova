
import { supabase } from "@/integrations/supabase/client";

export const salaryService = {
    async getAllSalaries() {
        const { data, error } = await supabase
            .from('salaries')
            .select('*, employees(full_name, employee_id_code)')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async getSalariesByMonth(month: string, year: number) {
        const { data, error } = await supabase
            .from('salaries')
            .select('*, employees(full_name, employee_id_code)')
            .eq('month', month)
            .eq('year', year);

        if (error) throw error;
        return data;
    },

    async getSalaryStats(month: string, year: number) {
        // In a real app we might use stored procedures or complex queries.
        // Fetching all for the month and calculating in JS for simplicity now.
        const data = await this.getSalariesByMonth(month, year);

        const totalPaid = data?.reduce((acc: number, curr: any) =>
            curr.status === 'paid' ? acc + Number(curr.amount) : acc, 0) || 0;

        const pendingAmount = data?.reduce((acc: number, curr: any) =>
            curr.status === 'pending' ? acc + Number(curr.amount) : acc, 0) || 0;

        const employeesPaid = data?.filter((r: any) => r.status === 'paid').length || 0;
        const employeesPending = data?.filter((r: any) => r.status === 'pending').length || 0;

        return { totalPaid, pendingAmount, employeesPaid, employeesPending };
    }
};
