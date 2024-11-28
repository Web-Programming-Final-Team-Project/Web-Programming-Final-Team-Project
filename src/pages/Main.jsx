import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import DKUlogo from "../assets/images/DKUlogo.svg";

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
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #F7F7F7;
    opacity: 0; 
    transform: translateY(10%);
    animation: ${reveal} 1s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
`;

const Header = styled.div`
    margin-bottom: 70px;
    display: flex;
    justify-content: center;
`;

const Logo = styled.img`
    height: 10vw;
    max-height: 80px; 
    object-fit: contain;
`;


const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
`;

const Button = styled.button`
    @import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Jua&display=swap');
    font-family: "Do Hyeon", sans-serif;
    letter-spacing: 1.4px;
    background-color: ${(props) => (props.highlight ? "#bbdefb" : "#ffffff")};
    border: none;
    border-radius: 10px;
    padding: 80px 60px;
    font-size: 33px;
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

function Main() {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Header>
                <Logo src={DKUlogo} alt="DKU Logo" />
            </Header>

            <Grid>
                <Button onClick={() => navigate("/departments")}>진료과목</Button>
                <Button onClick={() => navigate("/floor-guide")}>층별안내</Button>
                <Button onClick={() => navigate("/reception")}>접수</Button>
                <Button onClick={() => navigate("/staff-call")}>직원 호출</Button>
            </Grid>
        </Wrapper>
    );
}

export default Main;
