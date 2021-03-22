import React from 'react';
import { Carousel, Image } from 'react-bootstrap';

export const ProductCarousel = () => {
  const products = [
    { name: 'Cannon EOS 80D DSLR Camera', src: '/camera.jpg' },
    { name: 'IPhone 11 Pro 256GB Memory', src: '/phone.jpg' },
    { name: 'Sony Playstation 4 Pro White Version', src: '/playstation.jpg' },
  ];

  return (
    <Carousel pause="hover" className="bg-dark text-center mx-auto">
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
