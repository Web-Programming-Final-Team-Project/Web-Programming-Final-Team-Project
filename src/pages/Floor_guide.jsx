import React, { useState} from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

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
  position: relative;
  margin-bottom: 20px;
    
    @media (max-width: 1024px) {
        font-size: calc(10px + 3vmin);
    }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
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
  font-size: calc(5px + 1.7vmin);
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

    @media (max-width: 1024px) {
        font-size: calc(5px + 1.3vmin);
        padding: 8px 12px;
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
    font-family: "Do Hyeon", sans-serif;
    letter-spacing: 1.4px;
    background-color: ${(props) => (props.active ? "#406ac1" : "#ffffff")};
    color: ${(props) => (props.active ? "#ffffff" : "#406ac1")};
    border: none;
    border-radius: 10px;
    min-width: 80px;
    max-width: 100%;
    padding: 10px 15px;
    font-size: calc(5px + 1.7vmin);
    font-weight: bold;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    white-space: nowrap;
    word-break: keep-all;

    &:hover {
        background-color: #90caf9;
        transform: translateY(-5px);
    }

    &:active {
        background-color: #64b5f6;
        transform: translateY(0);
        box-shadow: none;
    }

    @media (max-width: 1024px) {
        font-size: calc(5px + 1.3vmin);
        padding: 8px 12px;
    }
`;


const Image = styled.img`
    width: 100%;
    max-width: 500px;
    margin-top: 20px;
    margin-bottom: 15px; 
    border: 1px solid #ccc;
`;

const BackButton = styled.button`
    @import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Jua&display=swap');
    font-family: "Do Hyeon", sans-serif;
    position: absolute;
    top: 50%;
    left: -25%;
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


const SearchButton = styled.button`
    @import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Jua&display=swap');
    font-family: "Do Hyeon", sans-serif;
    position: absolute;
    top: 50%;
    right: -20%; 
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
        right: 50%;
        transform: translate(50%, 0);
        width: 70%;
        font-size: 1rem;
        padding: 0.9375rem;
        border-radius: 1.875rem;

        &:hover {
            transform: scale(1.0) translate(50%, 0);
        }

        &:active {
            transform: scale(1.0) translate(50%, 0);
        }
    }
`;




const categories  = {
        "전체 조감도": [overallView],
        진료동: [
            { label: "1층", image: medicalBuilding1, keywords: ["재활의학과", "약제","의료정보팀","정신건강의학과",
                    "핵의학과","방사선종양학과","충남권역응급의료센터","권역외상센터"] },

            { label: "2층", image: medicalBuilding2, keywords: ["진단검사의학과","영상의학과","혈관조영센터",
                    "CT","MRI", "성형외과", "정형외과", "가정의학과", "내분비당뇨센터", "신장내과", "일반내과",
                    "감염내과", "심장혈관내과", "기능검사부", "신경과", "흉부외과", "소아청소년과"] },

            { label: "3층", image: medicalBuilding3, keywords: [ "심장혈관촬영실", "수술실", "중환자실", "내과계",
                    "신경외과", "안과", "산부인과", "피부과", "혈액투석실"] },

            { label: "4층", image: medicalBuilding4, keywords: ["병리과","검사실","작업환경의학과"] },

            { label: "5층", image: medicalBuilding5, keywords: ["강당","세미나실"] },
        ],
        
        "별관(암센터)": [
            { label: "1층", image: annex1, keywords: ["화장실","편의점"] },

            { label: "2층", image: annex2, keywords: ["종양암센터","혈액암센터","주사실","호흡기센터",
                    "알레르기센터","폐암센터","채혈실","이비인후과센터","두경부암센터"] },

            { label: "3층", image: annex3, keywords: ["간센터","담도센터","췌장센터","위장관센터","영상의학과 유방센터"
                ,"유방암센터","갑상선센터","비뇨의학과센터","비뇨암센터" ] },

            { label: "4층", image: annex4, keywords: ["종합검진센터","소화기내시경센터"] },

            { label: "6층, 7층", image: annex5, keywords: ["61병동","62병동","간호병동","간병병동"
                ,"71병동","72병동"] },

            { label: "전체층수", image: annex6},
        ],
        병동: [
            { label: "1층", image: ward1, keywords: ["격리병동","산모병동","분만실","11병동","소아청소년과"
                ,"신생아중환자실"] },

            { label: "2층", image: ward2, keywords: ["21병동","22병동","23병동","25병동"] },

            { label: "3층", image: ward3, keywords: ["수면다원검사실","권역외상센터중환자실","권역외상센터입원병동",
                "31병동","외과"] },

            { label: "4층", image: ward4, keywords: ["41병동","정신건강의학과","보호병동","42-3병동",
                    "구강외과","이비인후과","기타","43병동","45병동"] },

            { label: "5층", image: ward5, keywords: ["51병동","정형외과","52-3병동","정형외과","신경과","신경외과"
                ,"재활의학과","55병동","내과"] },

            { label: "6층", image: ward6 },
        ],
    };

function FloorGuide() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("전체 조감도");
    const [selectedImage, setSelectedImage] = useState(
        categories["전체 조감도"][0]
    );

    const handleSearch = () => {
        const allCategories = Object.keys(categories).filter(
            (category) => category !== "전체 조감도" // "전체 조감도" 제외
        );

        // Step 1: 카테고리 선택
        Swal.fire({
            title: "병원단지를 선택하세요",
            input: "select",
            inputOptions: allCategories.reduce((options, category) => {
                options[category] = category;
                return options;
            }, {}),
            inputPlaceholder: "여기를 눌러주세요 !",
            showCancelButton: true,
            confirmButtonText: "다음",
            cancelButtonText: "취소",
            reverseButtons: true,
            allowOutsideClick: true,
            heightAuto: false,
            backdrop: 'rgba(0, 0, 0, 0.8)'
        }).then((categoryResult) => {
            if (categoryResult.isConfirmed && categoryResult.value) {
                const selectedCategory = categoryResult.value;

                // Step 2: 키워드 선택
                const categoryKeywords = categories[selectedCategory]
                    .flatMap((floor) => floor.keywords || [])
                    .reduce((unique, keyword) => {
                        if (!unique.includes(keyword)) unique.push(keyword);
                        return unique;
                    }, []);

                if (categoryKeywords.length > 0) {
                    Swal.fire({
                        title: "진료과 및 병동을 선택하세요",
                        html: `
                        <div style="max-height: 200px; overflow-y: auto; text-align: left; padding: 10px; border: 1px solid #ccc; border-radius: 8px;">
                            ${categoryKeywords
                            .map(
                                (keyword) =>
                                    `<div style="
                                            margin-bottom: 8px;
                                            padding: 8px 0;
                                            cursor: pointer;
                                            font-size: 16px;
                                            color: #406ac1;
                                            border-bottom: 1px solid #ccc;
                                        " onclick="window.selectKeyword('${keyword}')">
                                            ${keyword}
                                        </div>`
                            )
                            .join("")}
                        </div>
                    `,
                        showCancelButton: true,
                        cancelButtonText: "취소",
                        showConfirmButton: false,
                        allowOutsideClick: true,
                        heightAuto: false,
                        backdrop: 'rgba(0, 0, 0, 0.8)'
                    });

                    // 선택된 키워드를 처리하는 글로벌 함수
                    window.selectKeyword = (selectedKeyword) => {
                        Swal.close(); // 현재 Swal 닫기
                        const targetFloor = categories[selectedCategory].find((floor) =>
                            floor.keywords?.includes(selectedKeyword)
                        );

                        if (targetFloor) {
                            Swal.fire({
                                title: `
            ${selectedKeyword}<br>
            ${selectedCategory} ${targetFloor.label}에 위치합니다.
        `,
                                confirmButtonText: "확인",
                                cancelButtonText: "취소",
                                reverseButtons: true,
                                allowOutsideClick: true,
                                heightAuto: false,
                                backdrop: 'rgba(0, 0, 0, 0.8)'
                            }).then(() => {
                                setActiveCategory(selectedCategory);
                                setSelectedImage(targetFloor.image);
                                document
                                    .querySelector(`[data-category="${selectedCategory}"]`)
                                    ?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "취소",
                                    });
                            });
                        } else {
                            Swal.fire({
                                title: "해당 키워드에 대한 정보를 찾을 수 없습니다.",
                                confirmButtonText: "확인",
                                cancelButtonText: "취소",
                                reverseButtons: true,
                                allowOutsideClick: true,
                                heightAuto: false,
                                backdrop: 'rgba(0, 0, 0, 0.8)'
                            });
                        }
                    };
                } else {
                    Swal.fire({
                        title: "선택한 카테고리에 키워드가 없습니다.",
                        confirmButtonText: "확인",
                        cancelButtonText: "취소",
                        reverseButtons: true,
                        allowOutsideClick: true,
                        heightAuto: false,
                        backdrop: 'rgba(0, 0, 0, 0.8)'
                    });
                }
            }
        });
    };




    window.selectCategory = (category) => {
        Swal.close();
        setActiveCategory(category);
        setSelectedImage(categories[category][0]?.image || categories[category][0]);

        document.querySelector(`[data-category="${category}"]`)?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setSelectedImage(categories[category][0]?.image || categories[category][0]);
    };

    return (
        <Wrapper>
            <Header>원하는 층이나 건물을 검색 혹은 선택해 보세요 !</Header>
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

                <Image src={selectedImage} alt={activeCategory} />
                    <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
                    <SearchButton onClick={handleSearch}>검색</SearchButton>

            {activeCategory !== "전체 조감도" && (
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
            <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
        </Wrapper>
    );
}

export default FloorGuide;