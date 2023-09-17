import React, { useEffect, useState } from "react";
import CarCardContainer from "../CarCardContainer/CarCardContainer.jsx";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";
import CarCard from "../CarCardContainer/CarCard/CarCard.jsx";
import CarCarousel from "./CarCarousel/CarCarousel.jsx";
import "./mainPage.css";
const imgSources = [
  "../../../../static/images/loganwobg.png",
  "../../../../static/images/bmw-m8.jpg",
  "../../../../static/images/bmw-m2-cs.jpg",
];

export default function MainPage() {
  // const [carData, setCarData] = useState();

  // useEffect(() => {
  //   fetch("/main/get_cars")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((result) => {
  //       setCarData(result);
  //     })
  //     .catch((reason) => {
  //       console.error("DB error");
  //     });
  // }, []);
  return (
    <div className="main-container">
      <CarCarousel>
        {imgSources.map((item, index) => {
          return (
            <div className="carCarousel__item">
              <img
                className="carCarousel__img"
                src={item}
                alt="car"
                key={index}
              ></img>
            </div>
          );
        })}
      </CarCarousel>
      {/* {carData && carData.length > 0 ? (
        <CarCardContainer data={carData} />
      ) : (
        <ErrorPage />
      )} */}
    </div>
  );
}
