import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.SUPABASEURI;
const supabaseAnonKey = import.meta.env.SUPABASEKEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
