import React from 'react';
import { Col, Nav, Row } from 'react-bootstrap';
import { Product } from 'src/generated/graphql';
import { ProductComponent } from '../Product/Product';

interface Props {
  products: Product[];
}
export const AllProducts: React.FC<Props> = ({ products }) => {
  return (
    <>
      <div className="d-flex">
        <div className="sidebar-products mr-4 text-left">
          <span className="h4 mb-2 d-block">Brand</span>
          <li>Brand 1</li>
          <li>Brand 2</li>
          <li>Brand 3</li>
          <li>Brand 4</li>
          <li>Brand 5</li>
        </div>

        <div>
          <Row noGutters>
            {products?.map(product => (
              <Col xs={12} sm={4} md={3} lg={2} key={product._id}>
                <ProductComponent product={product} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};
