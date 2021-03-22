import React from 'react';
import { Carousel, Image } from 'react-bootstrap';

export const HomeCarousel = () => {
  const products = [
    { name: '', src: '/carousel1.jpg' },
    { name: '', src: '/carousel2.jpg' },
  ];

  return (
    <Carousel pause="hover" className="bg-light text-center mx-auto">
      {products.map((product, index) => (
        <Carousel.Item key={index}>
          <Image src={product.src} alt={product.name} className="img-fluid" />

          <Carousel.Caption className="carousel-caption">
            <h2 className="text-uppercase">{product.name}</h2>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
