// ZmaniYom.tsx
import { GeoLocation, ZmanimCalendar } from "kosher-zmanim";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { textClasses } from "../styles/classes";

interface ZmanimTimes {
  netz: string;
  shacharit: string;
  kriatShema: string;
  mincha: string;
  arvit: string;
}

function ZmaniYom() {
  const [zmanimTimes, setZmanimTimes] = useState<ZmanimTimes>({
    netz: "לא זמין",
    shacharit: "לא זמין",
    kriatShema: "לא זמין",
    mincha: "לא זמין",
    arvit: "לא זמין",
  });

  useEffect(() => {
    try {
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
    } catch (error) {
      console.error("Error fetching zmanim times:", error);
    }
  }, []);

  return (
    <div>
      <h2 className={textClasses.titleClass}>זמני תפילות להיום</h2>
      <div className={textClasses.basicText}>נץ החמה: {zmanimTimes.netz}</div>
      <div className={textClasses.basicText}>
        זמן קריאת שמע (מגן אברהם): {zmanimTimes.shacharit}
      </div>
      <div className={textClasses.basicText}>
        זמן קריאת שמע (גר"א): {zmanimTimes.kriatShema}
      </div>
      <div className={textClasses.basicText}>
        מנחה גדולה: {zmanimTimes.mincha}
      </div>
      <div className={textClasses.basicText}>ערבית: {zmanimTimes.arvit}</div>
    </div>
  );
}

export default ZmaniYom;
