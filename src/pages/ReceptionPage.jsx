import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";

const reveal = keyframes`
    0% {
        opacity: 0;
        transform: translateY(10%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Wrapper = styled.div`
    font-family: "Do Hyeon", sans-serif;
    letter-spacing: 1.4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f7f7f7;
    opacity: 0;
    transform: translateY(10%);
    animation: ${reveal} 1s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
`;


const Clock = styled.div`
    font-size: 1.2rem;
    color: #406ac1;
    margin-bottom: 10px;
`;

const Header = styled.div`
    font-size: calc(20px + 1.5vmin);
    font-weight: bold;
    color: #406ac1;
    text-align: center;
    margin-bottom: 20px;
`;

const Input = styled.input`
    font-family: "Do Hyeon", sans-serif;
    padding: 0.625rem;
    border: 1px solid #ccc;
    border-radius: 0.625rem;
    width: 250px;
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 1rem;
`;

const Keypad = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    margin-bottom: 1rem;
`;

const KeyButton = styled.button`
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    padding: 1rem;
    color: #406ac1;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #d0e8f2;
    }

    &:active {
        background-color: #90caf9;
    }
`;

const Button = styled.button`
    background-color: ${(props) => (props.highlight ? "#bbdefb" : "#ffffff")};
    border: none;
    border-radius: 0.625rem;
    padding: 0.625rem 1.5625rem;
    font-size: 1rem;
    font-weight: bold;
    color: #406ac1;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #90caf9;
        transform: translateY(-5px);
    }

    &:active {
        background-color: #64b5f6;
        transform: translateY(0);
        box-shadow: none;
    }
`;

const QueueList = styled.div`
    font-family: "Do Hyeon", sans-serif;
    width: 100%;
    max-width: 500px;
    color: #406ac1;
    background: #ffffff;
    border: 1px solid #ccc;
    border-radius: 0.625rem;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const QueueItem = styled.div`
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
`;

const BackButton = styled.button`
    font-family: "Do Hyeon", sans-serif;
    position: fixed;
    top: 65%;
    left: -10%;
    transform: translateY(-50%);
    background-color: ${(props) => (props.highlight ? "#9fbcd5" : "#c2e5ff")};
    border: none;
    border-radius: 3.75rem;
    padding: 1.25rem 1.875rem;
    color: #406ac1;
    font-size: 1.25rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #90caf9;
        transform: translateY(-50%) scale(1.1);
    }

    &:active {
        background-color: #64b5f6;
        transform: translateY(-50%) scale(1.0);
        box-shadow: none;
    }

    @media (max-width: 1025px) {
        top: auto;
        bottom: -15%;
        left: 50%;
        transform: translate(-50%, 0);
        width: 70%;
        font-size: 1rem;
        padding: 0.9375rem;
        border-radius: 1.875rem;

        &:hover {
            transform: scale(1.0) translate(-50%, 0);
        }

        &:active {
            transform: scale(1.0) translate(-50%, 0);
        }
    }
`;

function ReceptionPage() {
    const navigate = useNavigate();
    const [queue, setQueue] = useState([]);
    const [ssn, setSsn] = useState("");
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
        };
        updateClock(); // Initialize clock
        const intervalId = setInterval(updateClock, 1000); // Update every second

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    const handleKeyPress = (value) => {
        setSsn((prev) => {
            if (value === "delete") {
                return prev.endsWith("-") ? prev.slice(0, -2) : prev.slice(0, -1);
            }
            // 최대 길이 초과 시 입력 차단
            if (prev.length >= 14) return prev;

            const newValue = prev + value;
            // 6자리에서 '-' 자동 삽입
            if (newValue.length === 6 && !newValue.includes("-")) {
                return newValue + "-";
            }
            return newValue;
        });
    };

    const addPatient = (e) => {
        e.preventDefault();
        if (ssn.length === 14) { // 주민등록번호는 13자리 + '-'
            const newQueue = [
                ...queue,
                {
                    id: queue.length + 1,
                    ssn,
                    estimatedTime: (queue.length + 1) * 10,
                },
            ];
            setQueue(newQueue);
            Swal.fire({
                title: "접수 완료!",
                text: `대기번호는 ${queue.length + 1}번입니다.`,
                icon: "success",
                confirmButtonColor: "#406ac1",
            });
            setSsn("");
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
        <Wrapper>
            <Clock>현재 시간: {currentTime}</Clock>
            <Header>환자 접수 시스템</Header>
            <Input
                type="text"
                value={ssn}
                placeholder="주민등록번호"
                readOnly
            />
            <Keypad>
                {[...Array(10).keys()].map((num) => (
                    <KeyButton key={num} onClick={() => handleKeyPress(String(num))}>
                        {num}
                    </KeyButton>
                ))}
                <KeyButton onClick={() => handleKeyPress("delete")}>⌫</KeyButton>
            </Keypad>
            <QueueList>
                <h3>현재 대기 상황</h3>
                {queue.length === 0 ? (
                    <p>현재 대기 인원이 없습니다.</p>
                ) : (
                    queue.map((patient) => (
                        <QueueItem key={patient.id}>
                            {patient.id}번 - 주민등록번호: {patient.ssn} - 예상 대기 시간: {patient.estimatedTime}분
                        </QueueItem>
                    ))
                )}
            </QueueList>
            <Button onClick={addPatient}>접수</Button>
            <BackButton onClick={() => navigate("/main")}>뒤로가기</BackButton>
        </Wrapper>
    );
}

export default ReceptionPage;
