import { createClient } from "@supabase/supabase-js";
import * as credenciales from "../secrets/credenciales";
// Create a single supabase client for interacting with your database
export const supabase = createClient(credenciales.URL, credenciales.API_KEY);
