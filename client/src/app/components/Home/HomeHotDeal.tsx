import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Product } from 'src/generated/graphql';
import { CartPresent } from './CartPresent';

export const HomeHotDeal = () => {
  const products: Partial<Product>[] = [
    {
      _id: 'product-present-1',
      name: 'The Sonic Shape-Shifter',
      image: '/hot-deal1.jpg',
      description:
        'NEW American Acoustasonic® Jazzmaster® Acoustic Guitar. From acoustic shapeshifting to electric rhythm tones, this extremely versatile guitar opens a new door to discovering endless sonic possibilities. Available in 5 Color Finishes. In Stock.',
    },
    {
      _id: 'product-present-2',
      name: 'Add Focus to your Camera & Webcam',
      image: '/hot-deal2.jpg',
      description: `Canon lenses don't just bring added focus & resolution to your pictures but can also make your digital connections clearer with the Canon Webcam Utility software. Special $100 Off select STM Lenses recommended for webcam use. Expires March 28th, 2021`,
    },
  ];

  return (
    <Row className="">
      <Col sm={12} md={6}>
        <CartPresent product={products[0]} />
      </Col>
      <Col sm={12} md={6}>
        <CartPresent product={products[1]} />
      </Col>
    </Row>
  );
};
