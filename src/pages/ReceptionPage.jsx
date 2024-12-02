import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
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
    input: {
        fontFamily: "'Do Hyeon', sans-serif",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        width: "250px",
        textAlign: "center",
        fontSize: "1.2rem",
        marginBottom: "20px",
    },
    keypad: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px",
        marginBottom: "20px",
    },
    keyButton: {
        backgroundColor: "#f0f0f0",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontSize: "1.5rem",
        padding: "15px",
        color: "#406ac1",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "all 0.3s ease",
    },
    button: {
        backgroundColor: "#bbdefb",
        border: "none",
        borderRadius: "10px",
        padding: "10px 20px",
        fontSize: "1rem",
        fontWeight: "bold",
        color: "#406ac1",
        cursor: "pointer",
        margin: "10px 0",
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




function ReceptionPage() {
    const navigate = useNavigate();
    const [ssn, setSsn] = useState("");
    const [currentTime, setCurrentTime] = useState("");
    const { addPatient } = useQueue();

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
        };
        updateClock();
        const intervalId = setInterval(updateClock, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const handleKeyPress = (value) => {
        setSsn((prev) => {
            if (value === "delete") {
                return prev.endsWith("-") ? prev.slice(0, -2) : prev.slice(0, -1);
            }
            if (prev.length >= 14) return prev;

            const newValue = prev + value;
            if (newValue.length === 6 && !newValue.includes("-")) {
                return newValue + "-";
            }
            return newValue;
        });
    };

    const handleAddPatient = (e) => {
        e.preventDefault();
        if (ssn.length === 14) {
            const queueNumber = addPatient(ssn); // 대기번호를 반환받음
            Swal.fire({
                title: "접수 완료!",
                text: `대기번호는 ${queueNumber}번입니다.`,
                icon: "success",
                confirmButtonColor: "#406ac1",
            });
            setSsn(""); // 입력 필드 초기화
        } else {
            Swal.fire({
                title: "오류",
                text: "주민등록번호는 13자리여야 합니다.",
                icon: "error",
                confirmButtonColor: "#ff6347",
            });
        }
    };



    return (
        <div style={styles.wrapper}>
            <div style={styles.clock}>현재 시간: {currentTime}</div>
            <div style={styles.header}>환자 접수 시스템</div>
            <input
                type="text"
                value={ssn}
                placeholder="주민등록번호"
                readOnly
                style={styles.input}
            />
            <div style={styles.keypad}>
                {[...Array(10).keys()].map((num) => (
                    <button
                        key={num}
                        onClick={() => handleKeyPress(String(num))}
                        style={styles.keyButton}
                    >
                        {num}
                    </button>
                ))}
                <button onClick={() => handleKeyPress("delete")} style={styles.keyButton}>
                    ⌫
                </button>
            </div>
            <button onClick={handleAddPatient} style={styles.button}>
                접수
            </button>
            <button onClick={() => navigate("/reception/order")} style={styles.button}>
                대기 상황 보기
            </button>
            <button onClick={() => navigate("/main")} style={styles.backButton}>
                뒤로가기
            </button>
        </div>
    );
}


export default ReceptionPage;