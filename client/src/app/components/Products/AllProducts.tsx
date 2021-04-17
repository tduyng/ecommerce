import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Product } from 'src/generated/graphql';
import { ProductComponent } from '../Product/Product';

interface Props {
  products: Product[];
}
export const AllProducts: React.FC<Props> = ({ products }) => {
  return (
    <>
      <div className="d-flex">
        <div className="sidebar-products">
          <h3>Brand</h3>
          <ul>
            <li>Brand 1</li>
            <li>Brand 4</li>
            <li>Brand 3</li>
            <li>Brand 2</li>
          </ul>
        </div>

        <div>
          <Row>
            <Col xs={12} sm={6} md={4} lg={3}>
              {products?.map(product => (
                <ProductComponent key={product._id} product={product} />
              ))}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
