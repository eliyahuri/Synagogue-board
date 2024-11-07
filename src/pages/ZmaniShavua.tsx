// ZmaniShavua.tsx
import { CalOptions, HebrewCalendar, Location, Event } from "@hebcal/core";
import { useEffect, useState } from "react";

function removeNikud(text: string): string {
  return text.replace(/[\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C7]/g, "");
}

function ZmaniShavua() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const start = new Date();
        const end = new Date();
        end.setDate(start.getDate() + 7); // Get events for the upcoming week

        const location = await Location.lookup("Tiberias");

        const options: CalOptions = {
          location,
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
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2 className="text-yellow-400 text-9xl">אירועי השבוע</h2>
      {events.map((item) => (
        <div key={`${item.desc}-${item.date}`}>
          {removeNikud(item.render())}
        </div>
      ))}
    </div>
  );
}

export default ZmaniShavua;
