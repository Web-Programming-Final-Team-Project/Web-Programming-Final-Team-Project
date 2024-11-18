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
      <p>화면을 터치ssss해 주세ssssss요ss</p>
    </div>
  );
}

export default App;
