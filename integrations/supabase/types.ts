export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      usuarios: {
        Row: {
          fecha_creacion: string | null
          id: string
          password: string | null
          progreso: number | null
          tipo_usuario: string | null
          username: string
        }
        Insert: {
          fecha_creacion?: string | null
          id?: string
          password?: string | null
          progreso?: number | null
          tipo_usuario?: string | null
          username: string
        }
        Update: {
          fecha_creacion?: string | null
          id?: string
          password?: string | null
          progreso?: number | null
          tipo_usuario?: string | null
          username?: string
        }
        Relationships: []
      }
      test_runs: {
        Row: {
          id: string
          user_id: string
          status: string
          started_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          status: string
          started_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          status?: string
          started_at?: string
          completed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "test_runs_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          }
        ]
      }
      test_answers: {
        Row: {
          id: string
          user_id: string
          run_id: string
          section: string
          question_code: string | null
          question_type: string | null
          answer_key: string | null
          answer_label: string | null
          answer_value: number | null
          notes: string | null
          created_at: string
          phase_key: string | null
          answer: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          run_id: string
          section: string
          question_code?: string | null
          question_type?: string | null
          answer_key?: string | null
          answer_label?: string | null
          answer_value?: number | null
          notes?: string | null
          created_at?: string
          phase_key?: string | null
          answer?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          run_id?: string
          section?: string
          question_code?: string | null
          question_type?: string | null
          answer_key?: string | null
          answer_label?: string | null
          answer_value?: number | null
          notes?: string | null
          created_at?: string
          phase_key?: string | null
          answer?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "test_answers_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_answers_run_id_fkey"
            columns: ["run_id"]
            referencedRelation: "test_runs"
            referencedColumns: ["id"]
          }
        ]
      }
      test_results: {
        Row: {
          id: string
          user_id: string
          run_id: string
          profile_type: string
          strengths: string | null
          recommended_careers: string | null
          score_json: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          run_id: string
          profile_type: string
          strengths?: string | null
          recommended_careers?: string | null
          score_json?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          run_id?: string
          profile_type?: string
          strengths?: string | null
          recommended_careers?: string | null
          score_json?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_results_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_results_run_id_fkey"
            columns: ["run_id"]
            referencedRelation: "test_runs"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          user_id: string
          display_name: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          user_id: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          user_id?: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          }
        ]
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
