import React, { useState, useEffect } from "react";
import "./LandingPage.css";

const LandingPage = () => {
  const [clicked, setClicked] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [tracers, setTracers] = useState([]);

  const handleClick = () => {
    setClicked(true);
  };

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    const newTracer = { x: e.clientX, y: e.clientY, id: Date.now() };
    setTracers((prevTracers) => [...prevTracers, newTracer]);

    setTimeout(() => {
      setTracers((prevTracers) => prevTracers.filter((t) => t.id !== newTracer.id));
    }, 250); // Adjust the duration as needed
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className={`landing-page ${clicked ? "green" : ""}`}
      onClick={handleClick}
    >
      {clicked && <div className="soon-text">Soon</div>}
      {tracers.map((tracer) => (
        <div
          key={tracer.id}
          className="cursor-tracer"
          style={{ left: tracer.x, top: tracer.y }}
        ></div>
      ))}
      <div className="cursor" style={{ left: cursorPos.x, top: cursorPos.y }}></div>
    </div>
  );
};

export default LandingPage;
