import React, { Children, cloneElement, useEffect, useState } from "react";

import "./carCarousel.css";

const PAGE_WIDTH = 1500;

function CarCarousel({ children }) {
  const [pages, setPages] = useState();

  useEffect(()=>{
    setPages(
      Children.map(children, (child)=> {
        return cloneElement(child, {
          style: {
            height: '100%',
            minWidth: `${PAGE_WIDTH}px`,
            maxWidth: `${PAGE_WIDTH}px`
          }
        })
      })
    )
  }, [])
  return (
    <div className="carCarousel_container">
      <div className="carCarousel_window">
        <div className="carCarousel_all-items-container">{children}</div>
      </div>
    </div>
  );
}

export default CarCarousel;
