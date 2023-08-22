import React, { Children, cloneElement, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./carCarousel.css";

const PAGE_WIDTH = 70;

function CarCarousel({ children }) {
  const [pages, setPages] = useState();
  const [offset, setOffset] = useState(0);

  const handleLeftArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset =
        currentOffset + PAGE_WIDTH > 0
          ? -(PAGE_WIDTH * (children.length - 1))
          : currentOffset + PAGE_WIDTH;
      return newOffset;
    });
  };
  const handleRightArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset =
        currentOffset - PAGE_WIDTH < -PAGE_WIDTH * (children.length - 1)
          ? 0
          : currentOffset - PAGE_WIDTH;
      return newOffset;
    });
  };

  useEffect(() => {
    setPages(
      Children.map(children, (child) => {
        return cloneElement(child, {
          style: {
            height: "100%",
            minWidth: `${PAGE_WIDTH}vw`,
            maxWidth: `${PAGE_WIDTH}vh`,
          },
        });
      })
    );
  }, []);
  return (
    <div className="carCarousel_container">
      <FaChevronLeft className="arrow" onClick={handleLeftArrowClick} />
      <div className="carCarousel_window">
        <div
          className="carCarousel_all-items-container"
          style={{
            transform: `translateX(${offset}vw)`,
          }}
        >
          {pages}
        </div>
      </div>
      <FaChevronRight className="arrow" onClick={handleRightArrowClick} />
    </div>
  );
}

export default CarCarousel;
