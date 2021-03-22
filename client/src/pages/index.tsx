import React, { useEffect, useState } from 'react';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';
import { MetaTags } from 'src/app/components/Layouts/MetaTags';
import Loader from 'src/app/components/Loader';
import { ProductCarousel } from 'src/app/components/Product/ProductCarousel';
import { Product, useProductsQuery } from 'src/generated/graphql';
import { Row, Col } from 'react-bootstrap';
import { ProductComponent } from 'src/app/components/Product/Product';

export default function Home() {
  const { data, loading } = useProductsQuery();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!loading) {
      setProducts(data?.products?.products as Product[]);
    }
  }, [data, loading]);

  return (
    <MainLayout>
      <MetaTags title="Home" />
      <ProductCarousel />

      <h1>Latest Product</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row>
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductComponent product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </MainLayout>
  );
}
