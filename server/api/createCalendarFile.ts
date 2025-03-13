import { supabase } from "~/utils/supabase";
import { Session } from "~/types/supabase";
import { EventAttributes } from "ics";
import * as ics from 'ics'

async function getData(filter: Number[]) {
  const { data, error } = await supabase.from("sessions").select().in('series_id', filter).overrideTypes<Session[]>()
  if (error) {
    throw error;
  }
  console.log(data)
  return data
}

export default defineEventHandler(async (event): Promise<string> => {
  const body = await readBody(event)
  const data = await getData(body.ids)


  let events: EventAttributes[] = []
  data.forEach(session => {
    if (!session.name) {
      throw new Error("session.name is not defined")
    }
    if (!session.start) {
      throw new Error("session.start is not defined")
    }
    let event: EventAttributes

    if (session.duration) {
      let timeData = session.duration.split(":")
      event = {
        start: Date.parse(session.start),
        startInputType: 'utc',
        title: session.name + ' - ' + session.session_type,
        duration: { hours: parseInt(timeData[0]), minutes: parseInt(timeData[1]), seconds: parseInt(timeData[2]) }
      }
    } else if (session.finish) {
      event = {
        start: Date.parse(session.start),
        startInputType: 'utc',
        title: session.name + ' - ' + session.session_type,
        end: Date.parse(session.finish),
        endInputType: 'utc'
      }
    } else {
      throw new Error("No duration or end date from session")
    }


    events.push(event)
  })

  const { error, value } = ics.createEvents(events)
  if (error) {
    throw error
  }

  if (value) {
    return value
  } else {
    throw new Error("value is undefined")
  }
})
