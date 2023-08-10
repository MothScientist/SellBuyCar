import React, { useEffect, useState } from "react";
import CarCardContainer from "../CarCardContainer/CarCardContainer.jsx";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";
import CarCard from "../CarCardContainer/CarCard/CarCard.jsx";

export default function MainPage() {
  const [carData, setCarData] = useState();

  useEffect(() => {
    fetch("/main/get_cars")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setCarData(result);
      }).catch((reason) => {
        console.error("DB error");
      });
  }, []);
  return (
    <div>
      <CarCard/>
      { carData && carData.length > 0 ? <CarCardContainer data={carData} /> : <ErrorPage/>}
    </div>
  );
}


