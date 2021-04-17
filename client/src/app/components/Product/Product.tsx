import React from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Link from 'next/link';
import { Rating } from './Rating';
import { truncate } from 'src/utils/truncate';
import { useAddToCartMutation } from 'src/generated/graphql';
import { toast } from 'react-toastify';

export const ProductComponent = ({ product }) => {
  const [addToCart] = useAddToCartMutation();
  const addToCartHandler = () => {
    toast.success('Item added to cart', {
      position: 'bottom-left',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <Card
      className="my-3 p-1 rounded text-left"
      style={{ cursor: 'pointer', minHeight: '21rem' }}
    >
      <Link href={`/product/${product._id}`} passHref>
        <Card.Img
          className="border-bottom"
          src={product.image}
          variant="top"
          style={{ cursor: 'pointer', height: '10rem', width: '100%' }}
        />
      </Link>

      <Card.Body>
        <Link href={`/product/${product._id}`} passHref>
          <Card.Title as="div" style={{ height: '4rem' }}>
            <small>
              <strong>{truncate(product.name, 40)}</strong>
            </small>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>
        <div className="d-flex  justify-content-between mt-1">
          <Card.Text as="h5" className="pt-2">
            ${product.price.toFixed(2)}
          </Card.Text>
          <div
            className="btn btn-transparent btn-cart ml-auto w-25"
            onClick={addToCartHandler}
          >
            <OverlayTrigger
              overlay={<Tooltip id="tooltip-disabled">Add to cart</Tooltip>}
            >
              <i className="fas fa-cart-plus"></i>
            </OverlayTrigger>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
