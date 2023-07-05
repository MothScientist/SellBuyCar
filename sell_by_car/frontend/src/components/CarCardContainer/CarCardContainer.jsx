import React from "react";
import CarCard from "./CarCard/CarCard.jsx";

function CarCardContainer({data}) {
    console.log(data)
    return ( <div className="car-container">
        {data.map((item) => {
            return <CarCard car={item} key={item.id}/>
        })}
    </div> );
}

export default CarCardContainer;