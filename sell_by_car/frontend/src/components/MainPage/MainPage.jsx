import React, { useEffect, useState } from "react";
import CarCardContainer from "../CarCardContainer/CarCardContainer.jsx";

export default function MainPage() {
  const [carData, setCarData] = useState();

  useEffect(() => {
    fetch("/main/get_cars")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setCarData(result);
      });
  }, []);
  return (
    <div>
      { carData ?  <CarCardContainer data={carData} /> : <p>NO</p> }
    </div>
  );
}
