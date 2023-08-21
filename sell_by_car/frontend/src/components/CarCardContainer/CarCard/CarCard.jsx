import React from "react";
import "./carCard.css"
import  logo from "../../../../static/images/bmw-m8.jpg"

function CarCard({ car }) {
  return (
    <article className="card">
      <img
        className="card__background"
        src={logo}
        alt="Something"
        width="1920"
        height="2193"
      />
      <div className="card__content | flow">
        <div className="card__content--container | flow">
          <h2 className="card__title">Something</h2>
          <p className="card__description">Something</p>
        </div>
        <button className="card__button">Read more</button>
      </div>
    </article>
  );
}

export default CarCard;
