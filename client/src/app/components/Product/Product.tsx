import React from 'react';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { Rating } from './Rating';

export const ProductComponent = ({ product }) => {
  return (
    <Card className="my-3 p-1 rounded" style={{ cursor: 'pointer' }}>
      <Link href={`/product/${product._id}`} passHref>
        <Card.Img
          src={product.image}
          variant="top"
          style={{ cursor: 'pointer', maxHeight: '10rem', width: '100%' }}
        />
      </Link>

      <Link href={`/product/${product._id}`}>
        <Card.Body>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>

          <Card.Text as="div">
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </Card.Text>

          <Card.Text as="h4" className="pt-2">
            ${product.price}
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};
