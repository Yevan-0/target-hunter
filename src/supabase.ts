import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mtwcenmfcsjrykoaxdiy.supabase.co"
const supabseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10d2Nlbm1mY3Nqcnlrb2F4ZGl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNDkzNzksImV4cCI6MjA5MzYyNTM3OX0.WugA6Rp2IgysEIeZxyaUpehf_JaRABDvYNXTJFmHZ3w"

export const supabase = createClient(supabaseUrl, supabseKey)