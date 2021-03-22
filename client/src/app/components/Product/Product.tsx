import React from 'react';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { Rating } from './Rating';

export const ProductComponent = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link href={`/product/${product._id}`} passHref>
        <Card.Img
          src={product.image}
          variant="top"
          style={{ maxHeight: '15rem', cursor: 'pointer' }}
        />
      </Link>

      <Card.Body>
        <Link href={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};
