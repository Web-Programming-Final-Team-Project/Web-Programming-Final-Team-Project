import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Departments from "./pages/Departments"
import StaffCall from "./pages/StaffCall";
import FloorGuide from "./pages/Floor_guide"
import ReceptionPage from "./pages/ReceptionPage";
import Order from "./pages/Order";

const MainPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/main");
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
                <Route path="/main" element={<Main />} /> {}
                <Route path="/departments" element={<Departments />} /> {}
                <Route path="/staff-call" element={<StaffCall />} /> {}
                <Route path="/floor-guide" element={<FloorGuide />} /> {}
                <Route path="/reception" element={<ReceptionPage />} /> {}
                <Route path="/reception/order" element={<Order />} /> {}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
