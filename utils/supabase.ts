import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://uynzxicmopaudkumoith.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5bnp4aWNtb3BhdWRrdW1vaXRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3MjUwMDIsImV4cCI6MjA1NTMwMTAwMn0.Ouk07MtJjARdGrV_y_Er2XWR8MHj18tvtFQLiQ8A07M';

// const supabaseUrl = process.env.NUXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NUXT_PUBLIC_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);