import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from 'react-router-dom';

import overallView from "../assets/images/overall_view.png";
import medicalBuilding1 from "../assets/images/medical_building_1.png";
import medicalBuilding2 from "../assets/images/medical_building_2.png";
import medicalBuilding3 from "../assets/images/medical_building_3.png";
import medicalBuilding4 from "../assets/images/medical_building_4.png";
import medicalBuilding5 from "../assets/images/medical_building_5.png";
import annex1 from "../assets/images/annex_1.png";
import annex2 from "../assets/images/annex_2.png";
import annex3 from "../assets/images/annex_3.png";
import annex4 from "../assets/images/annex_4.png";
import annex5 from "../assets/images/annex_5.png";
import annex6 from "../assets/images/annex_6.png";
import ward1 from "../assets/images/ward_1.png";
import ward2 from "../assets/images/ward_2.png";
import ward3 from "../assets/images/ward_3.png";
import ward4 from "../assets/images/ward_4.png";
import ward5 from "../assets/images/ward_5.png";
import ward6 from "../assets/images/ward_6.png";

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
  margin-top: 10px;
  padding: 20px;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 4px;
    background-color: #406ac1;
    margin: 10px auto 0;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const Tab = styled.button`
  font-family: "Do Hyeon", sans-serif;
  background-color: ${(props) => (props.active ? "#406ac1" : "#ffffff")};
  color: ${(props) => (props.active ? "#ffffff" : "#406ac1")};
  border: none;
  border-radius: 10px;
  padding: 10px 25px;
  margin: 0 8px;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: 700px;
`;

const Button = styled.button`
    @import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Jua&display=swap');
    font-family: "Do Hyeon", sans-serif;
  letter-spacing: 1.4px;
  background-color: ${(props) => (props.active ? "#406ac1" : "#ffffff")};
  color: ${(props) => (props.active ? "#ffffff" : "#406ac1")};
  border: none;
  border-radius: 10px;
  height: 50px;
  width: calc(100% / 6 - 10px); /* 6개 버튼을 한 줄에 배치 */
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

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

const Image = styled.img`
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
  border: 1px solid #ccc;
`;
const BackButton = styled.button`
    @import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Jua&display=swap');
    font-family: "Do Hyeon", sans-serif;
    position: fixed;
    top: 65%;
    left: -30%;
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

function FloorGuide() {
    const navigate = useNavigate(); // useNavigate로 navigate 초기화

    const categories = {
        "전체 조감도": [overallView],
        진료동: [
            { label: "1층", image: medicalBuilding1 },
            { label: "2층", image: medicalBuilding2 },
            { label: "3층", image: medicalBuilding3 },
            { label: "4층", image: medicalBuilding4 },
            { label: "5층", image: medicalBuilding5 },
        ],
        "별관(암센터)": [
            { label: "1층", image: annex1 },
            { label: "2층", image: annex2 },
            { label: "3층", image: annex3 },
            { label: "4층", image: annex4 },
            { label: "6~8층", image: annex5 },
            { label: "전체 층별안내", image: annex6 },
        ],
        병동: [
            { label: "1층", image: ward1 },
            { label: "2층", image: ward2 },
            { label: "3층", image: ward3 },
            { label: "4층", image: ward4 },
            { label: "5층", image: ward5 },
            { label: "6층", image: ward6 },
        ],
    };

    const [activeCategory, setActiveCategory] = useState("전체 조감도");
    const [selectedImage, setSelectedImage] = useState(
        categories["전체 조감도"][0]
    );

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setSelectedImage(categories[category][0]?.image || categories[category][0]);
    };

    return (
        <Wrapper>
            <Header>보고 싶은 층이나 건물을 선택하세요.</Header>

            <Tabs>
                {Object.keys(categories).map((category) => (
                    <Tab
                        key={category}
                        active={activeCategory === category}
                        onClick={() => handleCategoryChange(category)}
                    >
                        {category}
                    </Tab>
                ))}
            </Tabs>

            {activeCategory === "전체 조감도" ? (
                <Image src={selectedImage} alt="전체 조감도" />
            ) : (
                <Grid>
                    {categories[activeCategory].map((item, index) => (
                        <Button
                            key={index}
                            active={selectedImage === item.image}
                            onClick={() => setSelectedImage(item.image)}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Grid>
            )}

            {activeCategory !== "전체 조감도" && (
                <Image src={selectedImage} alt={`${activeCategory} 이미지`} />
            )}

            <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
        </Wrapper>
    );
}

export default FloorGuide;
