/**
 * Database Types for SISO-CLIENT-BASE
 *
 * Auto-generated types for Supabase database schema
 * Project: SISO-CLIENT-BASE
 * Instance: https://yeqosbhihojkrgexenzj.supabase.co
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

/**
 * Client Portal Database Schema
 */
export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string
          user_id: string | null
          name: string
          email: string
          status: 'active' | 'inactive' | 'pending'
          settings: Json | null
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          email: string
          status?: 'active' | 'inactive' | 'pending'
          settings?: Json | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          email?: string
          status?: 'active' | 'inactive' | 'pending'
          settings?: Json | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      client_users: {
        Row: {
          id: string
          client_id: string
          email: string
          role: 'admin' | 'user' | 'viewer'
          status: 'active' | 'inactive' | 'invited'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          email: string
          role?: 'admin' | 'user' | 'viewer'
          status?: 'active' | 'inactive' | 'invited'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          email?: string
          role?: 'admin' | 'user' | 'viewer'
          status?: 'active' | 'inactive' | 'invited'
          created_at?: string
          updated_at?: string
        }
      }
      client_projects: {
        Row: {
          id: string
          client_id: string
          name: string
          status: 'planning' | 'in_progress' | 'completed' | 'on_hold'
          metadata: Json | null
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          client_id: string
          name: string
          status?: 'planning' | 'in_progress' | 'completed' | 'on_hold'
          metadata?: Json | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          client_id?: string
          name?: string
          status?: 'planning' | 'in_progress' | 'completed' | 'on_hold'
          metadata?: Json | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      client_files: {
        Row: {
          id: string
          client_id: string
          project_id: string | null
          filename: string
          url: string
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          project_id?: string | null
          filename: string
          url: string
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          project_id?: string | null
          filename?: string
          url?: string
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      client_communications: {
        Row: {
          id: string
          client_id: string
          type: 'message' | 'notification' | 'email' | 'sms'
          content: string
          status: 'sent' | 'delivered' | 'read' | 'failed'
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          type: 'message' | 'notification' | 'email' | 'sms'
          content: string
          status?: 'sent' | 'delivered' | 'read' | 'failed'
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          type?: 'message' | 'notification' | 'email' | 'sms'
          content?: string
          status?: 'sent' | 'delivered' | 'read' | 'failed'
          metadata?: Json | null
          created_at?: string
          updated_at?: string
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
      client_status: 'active' | 'inactive' | 'pending'
      user_role: 'admin' | 'user' | 'viewer'
      project_status: 'planning' | 'in_progress' | 'completed' | 'on_hold'
      communication_type: 'message' | 'notification' | 'email' | 'sms'
      communication_status: 'sent' | 'delivered' | 'read' | 'failed'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

/**
 * Type helpers for client portal operations
 */
export type Client = Database['public']['Tables']['clients']['Row']
export type ClientInsert = Database['public']['Tables']['clients']['Insert']
export type ClientUpdate = Database['public']['Tables']['clients']['Update']

export type ClientUser = Database['public']['Tables']['client_users']['Row']
export type ClientUserInsert = Database['public']['Tables']['client_users']['Insert']
export type ClientUserUpdate = Database['public']['Tables']['client_users']['Update']

export type ClientProject = Database['public']['Tables']['client_projects']['Row']
export type ClientProjectInsert = Database['public']['Tables']['client_projects']['Insert']
export type ClientProjectUpdate = Database['public']['Tables']['client_projects']['Update']

export type ClientFile = Database['public']['Tables']['client_files']['Row']
export type ClientFileInsert = Database['public']['Tables']['client_files']['Insert']
export type ClientFileUpdate = Database['public']['Tables']['client_files']['Update']

export type ClientCommunication = Database['public']['Tables']['client_communications']['Row']
export type ClientCommunicationInsert = Database['public']['Tables']['client_communications']['Insert']
export type ClientCommunicationUpdate = Database['public']['Tables']['client_communications']['Update']
