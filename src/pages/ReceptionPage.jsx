import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

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

const Header = styled.div`
    font-size: calc(20px + 1.5vmin);
    font-weight: bold;
    color: #406ac1;
    text-align: center;
    margin-bottom: 20px;
`;

const Clock = styled.div`
    font-size: 1.2rem;
    color: #406ac1;
    margin-bottom: 10px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
`;

const Input = styled.input`
    font-family: "Do Hyeon", sans-serif;
    padding: 0.625rem;
    border: 1px solid #ccc;
    border-radius: 0.625rem;
    width: 250px;
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

function ReceptionPage() {
    const [queue, setQueue] = useState([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
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

    const addPatient = (e) => {
        e.preventDefault();
        if (name && age) {
            const newQueue = [
                ...queue,
                {
                    id: queue.length + 1,
                    name,
                    age,
                    estimatedTime: (queue.length + 1) * 10,
                },
            ];
            setQueue(newQueue);
            Swal.fire({
                title: "접수 완료!",
                text: `${name}님의 대기번호는 ${queue.length + 1}번입니다.`,
                icon: "success",
                confirmButtonColor: "#406ac1",
            });
            setName("");
            setAge("");
        }
    };

    return (
        <Wrapper>
            <Clock>현재 시간: {currentTime}</Clock>
            <Header>환자 접수 시스템</Header>
            <Form onSubmit={addPatient}>
                <Input
                    type="text"
                    placeholder="이름 입력"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Input
                    type="number"
                    placeholder="나이 입력"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
                <Button type="submit">접수</Button>
            </Form>

            <QueueList>
                <h3>현재 대기 상황</h3>
                {queue.length === 0 ? (
                    <p>현재 대기 인원이 없습니다.</p>
                ) : (
                    queue.map((patient) => (
                        <QueueItem key={patient.id}>
                            {patient.id}번 - {patient.name} ({patient.age}세) - 예상 대기 시간:{" "}
                            {patient.estimatedTime}분
                        </QueueItem>
                    ))
                )}
            </QueueList>
        </Wrapper>
    );
}

export default ReceptionPage;
