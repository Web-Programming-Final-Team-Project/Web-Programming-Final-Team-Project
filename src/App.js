import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import NextPage from "./NextPage"; 

const MainPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/next");
    };

    return (
        <>
            <div className="kiosk-screen-touch" onClick={handleClick}>
                <div className="hospital-title-group">
                    <div className="hospital-title-top">단국대학교병원</div>
                    <div className="hospital-title-bottom">어서오세요</div>
                </div>
                <p>화면 어디든 눌러주세요!</p>
            </div>
        </>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} /> {}
                <Route path="/next" element={<NextPage />} /> {}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
