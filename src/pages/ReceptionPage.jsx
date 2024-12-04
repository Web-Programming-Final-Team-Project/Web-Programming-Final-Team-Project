import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useQueue } from "./QueueContext";
import styled, { keyframes } from "styled-components";

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
    @import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Jua&display=swap');
    font-family: "Do Hyeon", sans-serif;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: #f7f7f7;
    padding: 20px;
    animation: ${reveal} 1s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
`;

const KeypadWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 2;
    margin: 0 20px; 
    position: relative;
`;

const Clock = styled.div`
    font-size: 2rem;
    color: #406ac1;
    font-weight: bold;
    margin-bottom: 20px;
    white-space: nowrap;
`;

const Header = styled.div`
    font-size: calc(30px + 1.5vmin);
    font-weight: bold;
    color: #35579e;
    text-align: center;
    margin-bottom: 20px;
    white-space: nowrap; 
`;

const Input = styled.input`
    font-family: 'Do Hyeon', sans-serif;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 250px;
    text-align: center;
    font-size: 1.6rem;
    margin-bottom: 20px;
`;



const Button = styled.button`
    font-family: "Do Hyeon", sans-serif;
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

   
    margin-top: 80%; 

    &:hover {
        background-color: #90caf9;
        transform: translateY(-10%) scale(1.1);
    }

    &:active {
        background-color: #64b5f6;
        transform: translateY(-10%) scale(1.0);
        box-shadow: none;
    }
    
`;


const Keypad = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin: 20px 0;
`;

const KeyButton = styled.button`
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1.5rem;
    padding: 15px;
    color: #406ac1;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #d9e3f0;
    }

    &:active {
        background-color: #b0c4de;
    }
`;

const Reception = styled.button`
    font-family: "Do Hyeon", sans-serif;
    background-color: ${(props) => (props.highlight ? "#0c7fe6" : "#0e5183")};
    border: none;
    border-radius: 3.75rem;
    padding: 1.25rem 1.875rem;
    color: #f2f6ff;
    font-size: 1.25rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;

    position: relative;
    top: 5rem;


    &:hover {
        background-color: #9bc6ed;
        transform: translateY(-10%) scale(1.1);
    }

    &:active {
        background-color: #82a5c3;
        transform: translateY(-10%) scale(1.0);
        box-shadow: none;
    }
    
`;


const DeleteKeyButton = styled.button`
    background-color: #0e5183;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1.5rem;
    padding: 15px;
    color: #f2f6ff;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #d9e3f0;
    }

    &:active {
        background-color: #b0c4de;
    }
`;



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
            const queueNumber = addPatient(ssn);
            Swal.fire({
                title: "접수 완료!",
                text: `대기번호는 ${queueNumber}번입니다.`,
                icon: "success",
                confirmButtonColor: "#406ac1",
                confirmButtonText: "닫기",
                allowOutsideClick: true,
                heightAuto: false,
                backdrop: 'rgba(0, 0, 0, 0.8)'
            }).then(() => {
                navigate("/reception/order");
            });
            setSsn("");
        } else {
            Swal.fire({
                text: "주민등록번호는 13자리여야 합니다.",
                icon: "error",
                confirmButtonColor: "#ff6347",
                confirmButtonText: "닫기",
                allowOutsideClick: true,
                heightAuto: false,
                backdrop: 'rgba(0, 0, 0, 0.8)'
            });
        }
    };

    return (
        <Wrapper>
            <Column>
                <Button onClick={() => navigate("/main")}>뒤로가기</Button>
            </Column>

            <KeypadWrapper>
                <Clock>현재 시간: {currentTime}</Clock>
                <Header>주민등록번호를 입력해주세요! </Header>
                <Input type="text" value={ssn} placeholder="주민등록번호" readOnly />
                <Keypad>
                    {[...Array(10).keys()].map((num) => (
                        <KeyButton
                            key={num}
                            onClick={() => handleKeyPress(String(num))}
                        >
                            {num}
                        </KeyButton>
                    ))}
                    <DeleteKeyButton onClick={() => handleKeyPress("delete")}>⌫</DeleteKeyButton>
                </Keypad>
            </KeypadWrapper>

            <Column>
                <Reception onClick={handleAddPatient}>접수</Reception>
                <Button onClick={() => navigate("/reception/order")}>
                    대기 현황
                </Button>
            </Column>
        </Wrapper>
    );
}

export default ReceptionPage;
