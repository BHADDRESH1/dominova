export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'owner' | 'admin' | 'ambassador' | 'employee'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'owner' | 'admin' | 'ambassador' | 'employee'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'owner' | 'admin' | 'ambassador' | 'employee'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      employees: {
        Row: {
          id: string
          profile_id: string | null
          employee_id_code: string
          full_name: string
          designation: string
          department: string
          date_of_joining: string
          employment_type: 'Full-time' | 'Part-time' | 'Contract'
          reporting_manager_id: string | null
          email: string
          contact_number: string | null
          status: 'active' | 'inactive'
          created_at: string
        }
        Insert: {
          id?: string
          profile_id?: string | null
          employee_id_code: string
          full_name: string
          designation: string
          department: string
          date_of_joining: string
          employment_type: 'Full-time' | 'Part-time' | 'Contract'
          reporting_manager_id?: string | null
          email: string
          contact_number?: string | null
          status?: 'active' | 'inactive'
          created_at?: string
        }
        Update: {
          id?: string
          profile_id?: string | null
          employee_id_code?: string
          full_name?: string
          designation?: string
          department?: string
          date_of_joining?: string
          employment_type?: 'Full-time' | 'Part-time' | 'Contract'
          reporting_manager_id?: string | null
          email?: string
          contact_number?: string | null
          status?: 'active' | 'inactive'
          created_at?: string
        }
      }
      salaries: {
        Row: {
          id: string
          employee_id: string
          amount: number
          base_salary: number | null
          bonuses: number | null
          deductions: number | null
          payment_status: 'paid' | 'pending' | 'processing'
          payment_date: string | null
          month: string
          year: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          employee_id: string
          amount: number
          base_salary?: number | null
          bonuses?: number | null
          deductions?: number | null
          payment_status?: 'paid' | 'pending' | 'processing'
          payment_date?: string | null
          month: string
          year: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          employee_id?: string
          amount?: number
          base_salary?: number | null
          bonuses?: number | null
          deductions?: number | null
          payment_status?: 'paid' | 'pending' | 'processing'
          payment_date?: string | null
          month?: string
          year?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      performance_reviews: {
        Row: {
          id: string
          employee_id: string
          review_date: string
          rating: 'Excellent' | 'Good' | 'Needs Improvement'
          remarks: string | null
          goals_met: boolean | null
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          employee_id: string
          review_date: string
          rating: 'Excellent' | 'Good' | 'Needs Improvement'
          remarks?: string | null
          goals_met?: boolean | null
          created_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          employee_id?: string
          review_date?: string
          rating?: 'Excellent' | 'Good' | 'Needs Improvement'
          remarks?: string | null
          goals_met?: boolean | null
          created_by?: string | null
          created_at?: string
        }
      }
      students: {
        Row: {
          id: string
          full_name: string
          email: string | null
          phone: string | null
          course_interested: string | null
          referred_by_id: string | null
          status: 'pending' | 'verified' | 'paid' | 'offer_letter_sent' | 'joined'
          payment_proof_url: string | null
          amount_paid: number | null
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email?: string | null
          phone?: string | null
          course_interested?: string | null
          referred_by_id?: string | null
          status?: 'pending' | 'verified' | 'paid' | 'offer_letter_sent' | 'joined'
          payment_proof_url?: string | null
          amount_paid?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string | null
          phone?: string | null
          course_interested?: string | null
          referred_by_id?: string | null
          status?: 'pending' | 'verified' | 'paid' | 'offer_letter_sent' | 'joined'
          payment_proof_url?: string | null
          amount_paid?: number | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'owner' | 'admin' | 'ambassador' | 'employee'
      emp_status: 'active' | 'inactive'
      payment_status: 'paid' | 'pending' | 'processing'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
