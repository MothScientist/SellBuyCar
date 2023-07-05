import React, { useEffect, useState } from "react";
import CarCardContainer from "../CarCardContainer/CarCardContainer.jsx";

export default function MainPage() {
  const [carData, setCarData] = useState();

  useEffect(() => {
    fetch("http://localhost:8000/admin")
      .then((response) => {
        response.json();
      })
      .then((result) => {
        setCarData(result);
        console.log(result);
      });
  }, []);
  return (
    <div>
        <p>Hello</p>
      {/* <CarCardContainer data={carData} /> */}
    </div>
  );
}
