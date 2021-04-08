import React from 'react';
import Slider from 'react-slick';

interface ArrowProps {
  onClick?: () => void;
}
const NextArrow: React.FC<ArrowProps> = props => {
  const { onClick } = props;
  return (
    <div className={'icon-related next'} onClick={onClick}>
      <i className="fas fa-chevron-circle-right"></i>
    </div>
  );
};

const PrevArrow: React.FC<ArrowProps> = props => {
  const { onClick } = props;
  return (
    <div className={'icon-related prev'} onClick={onClick}>
      <i className="fas fa-chevron-circle-left"></i>
    </div>
  );
};

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 6,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 510,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 430,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

interface SliderProps {}
export const CustomSlider: React.FC<SliderProps> = ({ children }) => {
  return (
    <div className="">
      <Slider {...settings} className="item-slider">
        {children}
      </Slider>
    </div>
  );
};
