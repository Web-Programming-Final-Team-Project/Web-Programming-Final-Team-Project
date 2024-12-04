import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, {keyframes} from "styled-components";
import { useQueue } from "./QueueContext";

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
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: #f7f7f7;
    animation: ${reveal} 1s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
    padding-bottom: 30%; 
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

const QueueList = styled.div`
    font-family: 'Do Hyeon', sans-serif;
    width: 100%;
    max-width: 500px;
    color: #406ac1;
    background: #ffffff;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;


const EmptyMessage = styled.div`
    font-size: 1rem;
    color: #406ac1;
`;

const QueueItem = styled.div`
    margin-bottom: 10px;
    font-size: 1rem;
    color: #406ac1;
`;

const BackButton = styled.button`
    @import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Jua&display=swap');
    font-family: "Do Hyeon", sans-serif;
    position: absolute; 
    top: 40%;
    left: -30%; 
    transform: translate(-120%, -50%);
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
        transform: translate(-120%, -50%) scale(1.1);
    }

    &:active {
        background-color: #64b5f6;
        transform: translate(-120%, -50%) scale(1.0);
        box-shadow: none;
    }

 
`;


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
        <Wrapper>
            <Clock>현재 시간: {currentTime}</Clock>
            <Header>현재 대기 현황</Header>
            <QueueList>
                {queue.length === 0 ? (
                    <EmptyMessage>현재 대기 인원이 없습니다.</EmptyMessage>
                ) : (
                    queue.map((patient) => (
                        <QueueItem key={patient.id}>
                            {patient.id}번 - 주민등록번호: {patient.ssn} - 예상 대기 시간:{" "}
                            {patient.estimatedTime}분
                        </QueueItem>
                    ))
                )}
            </QueueList>
            <BackButton onClick={() => navigate("/reception")}>뒤로가기</BackButton>
        </Wrapper>
    );
}

export default Order;