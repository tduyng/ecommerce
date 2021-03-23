import Link from 'next/link';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Product } from 'src/generated/graphql';

interface CartPresentProp {
  product: Partial<Product>;
}
export const CartPresent: React.FC<CartPresentProp> = ({ product }) => {
  return (
    <Card className="my-2 rounded" style={{ cursor: 'pointer' }}>
      <Link href={`/product/${product._id}`} passHref>
        <Card.Img
          src={product.image}
          variant="top"
          className="img-20"
          style={{ cursor: 'pointer' }}
        />
      </Link>
      <Link href={`/product/${product._id}`} passHref>
        <Card.Body className="pb-0 mb-2">
          <Card.Title as="div">
            <small>
              <strong>{product.name}</strong>
            </small>
          </Card.Title>

          <Card.Text as="div">
            <span>
              <small>{product.description}</small>
            </span>
          </Card.Text>

          <Card.Text as="div" className="mt-2 mb-0">
            <Link href={`/product/${product._id}`}>
              <a>
                <small>Shop Now</small>
              </a>
            </Link>
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};
