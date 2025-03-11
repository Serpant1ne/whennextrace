import { supabase } from "@/utils/supabase";
import { SeriesModified } from "~/types/supabase";

export default defineEventHandler(async (event): Promise<SeriesModified[]> => {
  const { data, error } = await supabase.from("series").select();
  if (error) {
    throw error;
  }
  data.forEach((item) => (item.selected = false));
  return data;
})
