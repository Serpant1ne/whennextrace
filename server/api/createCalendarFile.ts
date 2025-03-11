import { supabase } from "~/utils/supabase";
import * as ics from 'ics'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  let filter = ""
  body.ids.forEach((id: Number) => {
    filter = filter + 'series_id.eq.' + id + ','
  });
  filter = filter.slice(0, -1);

  const { data, error } = await supabase.from("sessions").select().or(filter)
  if (error) {
    throw error;
  }
})
