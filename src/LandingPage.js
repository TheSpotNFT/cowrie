import React, { useState, useEffect } from "react";
import "./LandingPage.css";

const LandingPage = () => {
  const [circles, setCircles] = useState([]);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const circlesArray = [];
    const rows = Math.ceil(window.innerHeight / 80);
    const cols = Math.ceil(window.innerWidth / 80);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        circlesArray.push({ id: `${i}-${j}`, x: j * 80, y: i * 80 });
      }
    }

    setCircles(circlesArray);
  }, []);

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    setCursorPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleClick = () => {
    // Add the URL you want to redirect to here
    const redirectUrl = "https://thespot.art/satsgallery";
    window.location.href = redirectUrl;
  };

  return (
    <div
      className="landing-page"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchMove}
      onClick={handleClick}
    >
      {circles.map((circle) => {
        const distanceX = cursorPos.x - circle.x;
        const distanceY = cursorPos.y - circle.y;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        let shiftX = 0;
        let shiftY = 0;

        if (distance < 100) { // Buffer distance to ensure circles don't touch the cursor
          const angle = Math.atan2(distanceY, distanceX);
          shiftX = Math.cos(angle) * 50; // 50 is half the width of the circle
          shiftY = Math.sin(angle) * 50;
        }

        return (
          <div
            key={circle.id}
            className="circle"
            style={{
              left: circle.x + shiftX,
              top: circle.y + shiftY,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default LandingPage;
