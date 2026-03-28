import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kdazbjwrvbegxhxkdqvf.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkYXpiandydmJlZ3hoeGtkcXZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2ODA0ODUsImV4cCI6MjA5MDI1NjQ4NX0.2f_IfWdqdvng7trRhjCgAdD5MauAXWRxvVhUuH6Njs0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
