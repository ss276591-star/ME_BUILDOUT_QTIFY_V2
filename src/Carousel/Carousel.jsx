import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import styles from "./Carousel.module.css";

function Carousel({ data, renderComponent }) {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, data.length));
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const visibleData = data.slice(startIndex);

  return (
    <div className={styles.wrapper}>
      {startIndex > 0 && (
        <button
          className={styles.prevButton}
          onClick={handlePrev}
          aria-label="Previous"
        >
          ‹
        </button>
      )}

      <Swiper
        spaceBetween={20}
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          900: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
      >
        {visibleData.map((item) => (
          <SwiperSlide key={item.id}>
            {renderComponent(item)}
          </SwiperSlide>
        ))}
      </Swiper>

      {startIndex < data.length - 1 && (
        <button
          className={styles.nextButton}
          onClick={handleNext}
          aria-label="Next"
        >
          ›
        </button>
      )}
    </div>
  );
}

export default Carousel;
