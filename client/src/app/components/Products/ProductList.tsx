import Link from 'next/link';
import React from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Product, useAdminDeleteProductMutation } from 'src/generated/graphql';

interface Props {
  products: Product[];
}
export const ProductList: React.FC<Props> = ({ products }) => {
  const [deleteProduct] = useAdminDeleteProductMutation();

  const deleteHandler = async (id: string) => {
    if (window.confirm('Are you sure')) {
      await deleteProduct({ variables: { _id: id } });
    }
  };

  const createProductHandler = () => {
    console.log('Create product');
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      <div>
        <Table striped bordered hover responsive className="table-sm text-left">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products?.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Link href={`/admin/product/${product._id}/edit`} passHref>
                    <Button variant="light" className="btn-sm mr-1">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </Link>

                  <Button
                    className="btn-sm btn-delete"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash text-red px-1"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
