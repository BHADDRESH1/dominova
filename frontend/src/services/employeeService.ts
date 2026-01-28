
import { supabase } from "@/integrations/supabase/client";

export interface Employee {
    id: string;
    employee_id_code: string;
    full_name: string;
    designation: string;
    department: string;
    status: "active" | "inactive";
    employment_type: "Full-time" | "Part-time" | "Contract";
    date_of_joining: string;
}

export const employeeService = {
    async getAllEmployees() {
        const { data, error } = await supabase
            .from('employees')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Employee[];
    },

    async createEmployee(employee: Omit<Employee, 'id'>) {
        const { data, error } = await supabase
            .from('employees')
            .insert([employee])
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};
