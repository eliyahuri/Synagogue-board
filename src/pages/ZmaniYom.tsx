// ZmaniYom.tsx
import { GeoLocation, ZmanimCalendar } from "kosher-zmanim";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

function ZmaniYom() {
  const [zmanimTimes, setZmanimTimes] = useState<Record<string, string | null>>(
    {}
  );

  useEffect(() => {
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
    <div>
      <h2>זמני תפילות להיום</h2>
      <div>נץ החמה: {zmanimTimes.netz}</div>
      <div>זמן קריאת שמע (מגן אברהם): {zmanimTimes.shacharit}</div>
      <div>זמן קריאת שמע (גר"א): {zmanimTimes.kriatShema}</div>
      <div>מנחה גדולה: {zmanimTimes.mincha}</div>
      <div>ערבית: {zmanimTimes.arvit}</div>
    </div>
  );
}

export default ZmaniYom;
