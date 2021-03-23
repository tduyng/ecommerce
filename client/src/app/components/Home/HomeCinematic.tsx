import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { Product } from 'src/generated/graphql';
import { CartPresent } from './CartPresent';

export const HomeCinematic = () => {
  const products: Partial<Product>[] = [
    {
      _id: 'product-cinematic-test-1',
      name: 'Astra 6X Bi-Color LED Panels',
      image: '/images/home/home-cine-1.jpg',
      description: `For lighting up newsrooms, studios and location sets around the world. Special Financing Available. `,
    },
    {
      _id: 'product-cinematic-test-1',
      name: 'Massive Storage. Compact Drive',
      image: '/images/home/home-cine-2.jpg',
      description: `Your digital life stored at your fingertips: Videos, games, file backup, etc with the New X6 500GB & 4TB Portable USB 3.2 Type-C SSD. In Stock.`,
    },
    {
      _id: 'product-cinematic-test-3',
      name: 'Take Your Adventure Gear to the Flipside',
      image: '/images/home/home-cine-3.jpg',
      description: `NEW Flipside BP 300 & 400 AW III Photo & Laptop Gear Backpacks redesigned with improved secure primary rear access. In Stock.`,
    },
  ];

  return (
    <div className="container-1400 mt-4">
      <div>
        <Image
          src="/images/home/home-cinematic.jpg"
          rounded
          className="img-fluid"
        ></Image>
      </div>
      <Row className="justify-content-center mx-auto pl-4 mt-2">
        {products.map((item, index) => (
          <Col xs={12} sm={4} md={4} lg={4} key={index} className="d-block">
            <CartPresent product={item}></CartPresent>
          </Col>
        ))}
      </Row>
    </div>
  );
};
