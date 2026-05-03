export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; name: string | null; role: string | null; created_at: string }
        Insert: { id: string; name?: string | null; role?: string | null; created_at?: string }
        Update: { id?: string; name?: string | null; role?: string | null; created_at?: string }
      }
      products: {
        Row: { id: string; sku: string; name: string; description: string | null; created_at: string }
        Insert: { id?: string; sku: string; name: string; description?: string | null; created_at?: string }
        Update: { id?: string; sku?: string; name?: string; description?: string | null; created_at?: string }
      }
      skus: {
        Row: { id: string; product_id: string | null; sku_variation: string; quantity: number; location: string | null; created_at: string }
        Insert: { id?: string; product_id?: string | null; sku_variation: string; quantity?: number; location?: string | null; created_at?: string }
        Update: { id?: string; product_id?: string | null; sku_variation?: string; quantity?: number; location?: string | null; created_at?: string }
      }
      orders: {
        Row: { id: string; customer_name: string; address: string | null; total_amount: number | null; payment_method: string | null; status: string | null; created_at: string }
        Insert: { id?: string; customer_name: string; address?: string | null; total_amount?: number | null; payment_method?: string | null; status?: string | null; created_at?: string }
        Update: { id?: string; customer_name?: string; address?: string | null; total_amount?: number | null; payment_method?: string | null; status?: string | null; created_at?: string }
      }
      order_items: {
        Row: { id: string; order_id: string | null; sku_id: string | null; quantity: number; price_at_order: number | null; created_at: string }
        Insert: { id?: string; order_id?: string | null; sku_id?: string | null; quantity: number; price_at_order?: number | null; created_at?: string }
        Update: { id?: string; order_id?: string | null; sku_id?: string | null; quantity?: number; price_at_order?: number | null; created_at?: string }
      }
      invoices: {
        Row: { id: string; order_id: string | null; invoice_number: string | null; xml_data: Json | null; danfe_url: string | null; status: string | null; created_at: string }
        Insert: { id?: string; order_id?: string | null; invoice_number?: string | null; xml_data?: Json | null; danfe_url?: string | null; status?: string | null; created_at?: string }
        Update: { id?: string; order_id?: string | null; invoice_number?: string | null; xml_data?: Json | null; danfe_url?: string | null; status?: string | null; created_at?: string }
      }
      shipments: {
        Row: { id: string; order_id: string | null; tracking_code: string | null; carrier: string | null; status: string | null; created_at: string }
        Insert: { id?: string; order_id?: string | null; tracking_code?: string | null; carrier?: string | null; status?: string | null; created_at?: string }
        Update: { id?: string; order_id?: string | null; tracking_code?: string | null; carrier?: string | null; status?: string | null; created_at?: string }
      }
      logs: {
        Row: { id: string; user_id: string | null; action: string; details: Json | null; created_at: string }
        Insert: { id?: string; user_id?: string | null; action: string; details?: Json | null; created_at?: string }
        Update: { id?: string; user_id?: string | null; action?: string; details?: Json | null; created_at?: string }
      }
    }
  }
}
