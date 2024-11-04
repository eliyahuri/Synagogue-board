/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalOptions, HebrewCalendar, Location } from "@hebcal/core";
import { GeoLocation, ZmanimCalendar } from "kosher-zmanim";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

function Zmanim() {
  function removeNikud(text: string): string {
    return text.replace(/[\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C7]/g, "");
  }

  const [events, setEvents] = useState<any[]>([]);
  const [zmanimTimes, setZmanimTimes] = useState<Record<string, string | null>>(
    {}
  );

  useEffect(() => {
    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() + 7);

    const options: CalOptions = {
      location: Location.lookup("Tiberias"),
      molad: true,
      candlelighting: true,
      month: start.getMonth() + 1,
      omer: true,
      sedrot: true,
      start,
      end,
      locale: "he",
    };

    const calendarEvents = HebrewCalendar.calendar(options);
    setEvents(calendarEvents);

    const zmanimLocation = new GeoLocation(
      "Tiberias",
      32.795,
      35.529,
      0,
      "Asia/Jerusalem"
    );

    const zmanimCalendar = new ZmanimCalendar(zmanimLocation);

    const getTimeString = (time: DateTime | null) => {
      if (!time) return "לא זמין";
      return time.setZone("Asia/Jerusalem").toFormat("HH:mm");
    };

    const zmanim = {
      netz: getTimeString(zmanimCalendar.getSunrise()),
      shacharit: getTimeString(zmanimCalendar.getSofZmanShmaMGA()),
      kriatShema: getTimeString(zmanimCalendar.getSofZmanShmaGRA()),
      mincha: getTimeString(zmanimCalendar.getMinchaGedola()),
      arvit: getTimeString(zmanimCalendar.getTzais()),
    };
    setZmanimTimes(zmanim);
  }, []);

  return (
    <>
      <h2>זמני תפילות</h2>
      <div>נץ החמה: {zmanimTimes.netz}</div>
      <div>זמן קריאת שמע (מגן אברהם): {zmanimTimes.shacharit}</div>
      <div>זמן קריאת שמע (גר"א): {zmanimTimes.kriatShema}</div>
      <div>מנחה גדולה: {zmanimTimes.mincha}</div>
      <div>ערבית: {zmanimTimes.arvit}</div>

      <h2>אירועי היום</h2>
      {events.map((item) => {
        return (
          <div key={`${item.desc}-${item.date}`}>
            {removeNikud(item.render())}
          </div>
        );
      })}
    </>
  );
}

export default Zmanim;
