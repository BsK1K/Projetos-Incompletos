export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      additional_items: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          price_per_day: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          price_per_day: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          price_per_day?: number
        }
        Relationships: []
      }
      insurance_plans: {
        Row: {
          coverage_details: string[] | null
          created_at: string | null
          deductible: number | null
          description: string
          id: string
          name: string
          price_per_day: number
        }
        Insert: {
          coverage_details?: string[] | null
          created_at?: string | null
          deductible?: number | null
          description: string
          id?: string
          name: string
          price_per_day: number
        }
        Update: {
          coverage_details?: string[] | null
          created_at?: string | null
          deductible?: number | null
          description?: string
          id?: string
          name?: string
          price_per_day?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          birth_date: string | null
          city: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          state: string | null
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          birth_date?: string | null
          city?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          birth_date?: string | null
          city?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      reservation_additionals: {
        Row: {
          additional_item_id: string
          created_at: string | null
          id: string
          price_per_day: number
          quantity: number | null
          reservation_id: string
        }
        Insert: {
          additional_item_id: string
          created_at?: string | null
          id?: string
          price_per_day: number
          quantity?: number | null
          reservation_id: string
        }
        Update: {
          additional_item_id?: string
          created_at?: string | null
          id?: string
          price_per_day?: number
          quantity?: number | null
          reservation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservation_additionals_additional_item_id_fkey"
            columns: ["additional_item_id"]
            isOneToOne: false
            referencedRelation: "additional_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservation_additionals_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      reservations: {
        Row: {
          additionals_price: number | null
          confirmation_code: string | null
          created_at: string | null
          id: string
          insurance_plan_id: string | null
          insurance_price: number | null
          payment_method: string | null
          payment_status: string | null
          pickup_date: string
          pickup_location: string
          return_date: string
          status: string
          total_days: number
          total_price: number
          updated_at: string | null
          user_id: string
          vehicle_id: string
          vehicle_price: number
        }
        Insert: {
          additionals_price?: number | null
          confirmation_code?: string | null
          created_at?: string | null
          id?: string
          insurance_plan_id?: string | null
          insurance_price?: number | null
          payment_method?: string | null
          payment_status?: string | null
          pickup_date: string
          pickup_location: string
          return_date: string
          status?: string
          total_days: number
          total_price: number
          updated_at?: string | null
          user_id: string
          vehicle_id: string
          vehicle_price: number
        }
        Update: {
          additionals_price?: number | null
          confirmation_code?: string | null
          created_at?: string | null
          id?: string
          insurance_plan_id?: string | null
          insurance_price?: number | null
          payment_method?: string | null
          payment_status?: string | null
          pickup_date?: string
          pickup_location?: string
          return_date?: string
          status?: string
          total_days?: number
          total_price?: number
          updated_at?: string | null
          user_id?: string
          vehicle_id?: string
          vehicle_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "reservations_insurance_plan_id_fkey"
            columns: ["insurance_plan_id"]
            isOneToOne: false
            referencedRelation: "insurance_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_documents: {
        Row: {
          document_type: string
          document_url: string
          id: string
          uploaded_at: string | null
          user_id: string
          verified: boolean | null
        }
        Insert: {
          document_type: string
          document_url: string
          id?: string
          uploaded_at?: string | null
          user_id: string
          verified?: boolean | null
        }
        Update: {
          document_type?: string
          document_url?: string
          id?: string
          uploaded_at?: string | null
          user_id?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          available: boolean | null
          brand: string
          category: string
          consumption: string | null
          created_at: string | null
          description: string | null
          engine: string | null
          features: string[] | null
          fuel_type: string
          gallery_images: string[] | null
          id: string
          luggage_capacity: string | null
          main_image: string
          model: string
          name: string
          passengers: number
          price_per_day: number
          transmission: string
          updated_at: string | null
          year: number
        }
        Insert: {
          available?: boolean | null
          brand: string
          category: string
          consumption?: string | null
          created_at?: string | null
          description?: string | null
          engine?: string | null
          features?: string[] | null
          fuel_type: string
          gallery_images?: string[] | null
          id?: string
          luggage_capacity?: string | null
          main_image: string
          model: string
          name: string
          passengers: number
          price_per_day: number
          transmission: string
          updated_at?: string | null
          year: number
        }
        Update: {
          available?: boolean | null
          brand?: string
          category?: string
          consumption?: string | null
          created_at?: string | null
          description?: string | null
          engine?: string | null
          features?: string[] | null
          fuel_type?: string
          gallery_images?: string[] | null
          id?: string
          luggage_capacity?: string | null
          main_image?: string
          model?: string
          name?: string
          passengers?: number
          price_per_day?: number
          transmission?: string
          updated_at?: string | null
          year?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
