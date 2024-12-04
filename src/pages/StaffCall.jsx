import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
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
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: #f7f7f7;
    animation: ${reveal} 1s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
    padding-bottom: 15%; 
`;

const TimerText = styled.div`
    font-size: calc(30px + 1.5vmin);
    font-weight: bold;
    color: #35579e;
    text-align: center;
    margin-bottom: 20px;
    white-space: nowrap;
`;

const CancelButton = styled.button`
    @import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Jua&display=swap');
    font-family: "Do Hyeon", sans-serif;
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e74c3c;
  }

  &:active {
    background-color: #c0392b;
  }
`;


const StaffCallPage = () => {
    const [timer, setTimer] = useState(15);
    const [isCalling, setIsCalling] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        let countdown;
        if (isCalling) {
            countdown = setInterval(() => {
                setTimer((prev) => Math.max(prev - 1, 0));
            }, 1000);
        }
        return () => clearInterval(countdown);
    }, [isCalling]);

    const handleCancelClick = () => {
        setIsCalling(false);
        setTimer(0);

        Swal.fire({
            title: "호출이 취소되었습니다.",
            text: "잠시 후 이전 화면으로 이동합니다.",
            timer: 5000,
            showConfirmButton: false,
            allowOutsideClick: false,
        });

        setTimeout(() => {
            navigate("/main");
        }, 5000);
    };

    return (
        <Wrapper>
            {isCalling ? (
                <>
                    <TimerText>
                        {timer > 0 ? (
                            <>
                                직원이 호출되었습니다. <br />
                                예상 대기 시간: {timer}초
                            </>
                        ) : (
                            "잠시만 기다려주시면 직원이 도착합니다 !"
                        )}
                    </TimerText>
                    <CancelButton onClick={handleCancelClick}>호출 취소</CancelButton>
                </>
            ) : null}
        </Wrapper>
    );
};

export default StaffCallPage;
