import React, { useEffect, useState } from "react";
import Welcome from "./pages/Welcome";
import Zmanim from "./pages/Zmanim";

const pages = [
  <Welcome synagogueName="היכל רחמים" />,
  <Zmanim />,
  <div>Page 3 Content</div>,
  // Add more pages as needed
];

const Presentation: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % pages.length);
    }, 10000); // 10000 ms = 10 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  return <div>{pages[currentPage]}</div>;
};

export default Presentation;
