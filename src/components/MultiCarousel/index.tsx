import { FC } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 900 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 900, min: 600 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const MultiCarousel: FC = ({ children }) => {
  return (
    <Carousel
      draggable={false}
      responsive={responsive}
      removeArrowOnDeviceType={["tablet", "mobile"]}
    >
      {children}
    </Carousel>
  );
};

export default MultiCarousel;
