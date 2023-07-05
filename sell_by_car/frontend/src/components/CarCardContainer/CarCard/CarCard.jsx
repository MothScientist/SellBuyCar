import React from "react";

function CarCard({ car }) {
  return (
    <div className="carCard">
      <h1>{car.brand}</h1>
      <p>{car.model}</p>
      <p>{car.year}</p>
      <p>{car.mileage}</p>
      <p>{car.price}</p>
      <p>{car.warranty}</p>
      <p>{car.weight}</p>
      <p>{car.accident}</p>
      <p>{car.car_owners}</p>
      <p>{car.to_100}</p>
      <p>{car.engine}</p>
      <p>{car.power}</p>
      <p>{car.torque}</p>
    </div>
  );
}

export default CarCard;
