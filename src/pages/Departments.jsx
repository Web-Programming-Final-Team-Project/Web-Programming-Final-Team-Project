import React, { useState } from "react";
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
    @import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Jua&display=swap');
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
    font-size: calc(25px + 1.5vmin);
    font-weight: bold;
    color: #406ac1;
    text-align: center;
    position: relative;
`;

const Tabs = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
`;

const Tab = styled.button`
    background-color: ${(props) => (props.active ? "#406ac1" : "#ffffff")};
    color: ${(props) => (props.active ? "#ffffff" : "#406ac1")};
    border: none;
    border-radius: 10px;
    padding: 10px 25px;
    margin: 0 8px;
    cursor: pointer;
    font-size: 15px;
    letter-spacing: 1.4px;
    font-weight: bold;
    font-family: 'Do Hyeon', sans-serif;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;
    max-width: 700px;
`;

const Button = styled.button`
    @import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Jua&display=swap');
    font-family: "Do Hyeon", sans-serif;
    letter-spacing: 1.4px;
    background-color: ${(props) => (props.highlight ? "#bbdefb" : "#ffffff")};
    border: none;
    border-radius: 10px;
    height: 100px;
    width: 100%;
    font-size: 20px;
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

const BackButton = styled.button`
    @import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Jua&display=swap');
    font-family: "Do Hyeon", sans-serif;
    position: fixed;
    top: 65%;
    left: -5%; 
    transform: translateY(-50%);
    background-color: ${(props) => (props.highlight ? "#9fbcd5" : "#c2e5ff")};
    border: none;
    border-radius: 60px;
    padding: 20px 30px;
    color: #406ac1;
    font-size: 20px;
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
        font-size: 16px;
        padding: 15px;
        border-radius: 30px;

        &:hover {
            transform: scale(1.0) translate(-50%, 0); 
        }

        &:active {
            transform: scale(1.0) translate(-50%, 0);
        }
    }
`;

function Departments() {
    const navigate = useNavigate();

    const categories = {
        "내과계": ["소화기내과", "심장혈관내과", "호흡기-알레르기내과", "내분비대사내과", "신장내과", "혈액종양내과", "감염내과", "류마티스내과"],
        "외과계": ["외과", "외상학과", "산부인과", "정형외과", "신경외과", "심장혈관흉부외과", "성형외과", "안과"],
        "기타 진료": ["피부과", "이비인후과", "비뇨의학과", "가정의학과", "직업환경의학과", "재활의학과", "응급의학과", "마취통증의학과"]
    };

    const [activeCategory, setActiveCategory] = useState("내과계");

    const handleButtonClick = (department) => {
        import(`./descriptions/${department}.js`).then((module) => {
            Swal.fire({
                title: department,
                html: `<strong>${module.default}</strong>`,
                confirmButtonText: "닫기",
                confirmButtonColor: "#406ac1",
                allowOutsideClick: true,
                heightAuto: false,
                backdrop: `
                     rgba(0, 0, 0, 0.8)
                    `,

            });
        });
    };

    return (
        <Wrapper>
            <Header>
                원하시는 진료과목 버튼을 누르시면 상세 진료 내용을 확인하실 수 있습니다 !
            </Header>

            <Tabs>
                {Object.keys(categories).map((category) => (
                    <Tab
                        key={category}
                        active={activeCategory === category}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </Tab>
                ))}
            </Tabs>

            <Grid>
                {categories[activeCategory].map((department, index) => (
                    <Button key={index} onClick={() => handleButtonClick(department)}>
                        {department}
                    </Button>
                ))}
            </Grid>

            <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
        </Wrapper>
    );
}

export default Departments;
