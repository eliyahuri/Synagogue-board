import React, { useEffect, useState } from "react";
import Welcome from "./pages/Welcome";
import ZmaniShavua from "./pages/ZmaniShavua";
import ZmaniYom from "./pages/ZmaniYom";

const pages = [
  <Welcome synagogueName="היכל רחמים" lang="he" />,
  <ZmaniShavua />,
  <ZmaniYom />,
];

const Presentation: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % pages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return <div>{pages[currentPage]}</div>;
};

export default Presentation;
