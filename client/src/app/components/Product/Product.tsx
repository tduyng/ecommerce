import React from 'react';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { Rating } from './Rating';
import { truncate } from 'src/utils/truncate';

export const ProductComponent = ({ product }) => {
  return (
    <Card
      className="my-3 p-1 rounded text-left"
      style={{ cursor: 'pointer', minHeight: '21rem' }}
    >
      <Link href={`/product/${product._id}`} passHref>
        <Card.Img
          src={product.image}
          variant="top"
          style={{ cursor: 'pointer', height: '10rem', width: '100%' }}
        />
      </Link>

      <Link href={`/product/${product._id}`}>
        <Card.Body>
          <Card.Title as="div" style={{ height: '4rem' }}>
            <small>
              <strong>{truncate(product.name, 40)}</strong>
            </small>
          </Card.Title>

          <Card.Text as="div">
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </Card.Text>
          <div className="d-flex  justify-content-between mt-1">
            <Card.Text as="h5" className="pt-2">
              ${product.price.toFixed(2)}
            </Card.Text>
            <button className="btn btn-transparent btn-cart ml-auto w-25">
              <i className="fas fa-cart-plus"></i>
            </button>
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
};
