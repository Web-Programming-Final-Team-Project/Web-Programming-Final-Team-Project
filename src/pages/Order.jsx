import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueue } from "./QueueContext";

const styles = {
    wrapper: {
        fontFamily: "'Do Hyeon', sans-serif",
        letterSpacing: "1.4px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f7f7f7",
        padding: "20px",
        height: "100vh",
    },
    clock: {
        fontSize: "1.2rem",
        color: "#406ac1",
        marginBottom: "10px",
    },
    header: {
        fontSize: "calc(20px + 1.5vmin)",
        fontWeight: "bold",
        color: "#406ac1",
        textAlign: "center",
        marginBottom: "20px",
    },
    queueList: {
        fontFamily: "'Do Hyeon', sans-serif",
        width: "100%",
        maxWidth: "500px",
        color: "#406ac1",
        background: "#ffffff",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    queueHeader: {
        fontSize: "1.2rem",
        fontWeight: "bold",
        color: "#406ac1",
        marginBottom: "15px",
    },
    emptyMessage: {
        fontSize: "1rem",
        color: "#406ac1",
    },
    queueItem: {
        marginBottom: "10px",
        fontSize: "1rem",
        color: "#406ac1",
    },
    backButton: {
        backgroundColor: "#c2e5ff",
        border: "none",
        borderRadius: "30px",
        padding: "15px 30px",
        color: "#406ac1",
        fontSize: "1rem",
        fontWeight: "bold",
        position: "fixed",
        bottom: "10px",
        left: "10px",
        cursor: "pointer",
    },
};


function Order() {
    const navigate = useNavigate();
    const { queue } = useQueue();
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
        };
        updateClock();
        const intervalId = setInterval(updateClock, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div style={styles.wrapper}>
            <div style={styles.clock}>현재 시간: {currentTime}</div>
            <div style={styles.header}>환자 접수 시스템</div>
            <div style={styles.queueList}>
                <h3 style={styles.queueHeader}>현재 대기 상황</h3>
                {queue.length === 0 ? (
                    <p style={styles.emptyMessage}>현재 대기 인원이 없습니다.</p>
                ) : (
                    queue.map((patient) => (
                        <div key={patient.id} style={styles.queueItem}>
                            {patient.id}번 - 주민등록번호: {patient.ssn} - 예상 대기 시간:{" "}
                            {patient.estimatedTime}분
                        </div>
                    ))
                )}
            </div>
            <button onClick={() => navigate("/reception")} style={styles.backButton}>
                뒤로가기
            </button>
        </div>
    );
}

export default Order;
