import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/next");
  };

  return (
      <div className="kiosk-screen" onClick={handleClick}>
        <p>화면을 터치해 주세요</p>
      </div>
  );
}

export default App;