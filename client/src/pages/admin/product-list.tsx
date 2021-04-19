import { GetServerSideProps } from 'next';
import React from 'react';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';
import { MetaTags } from 'src/app/components/Layouts/MetaTags';
import { ProductList } from 'src/app/components/Products/ProductList';
import { Product } from 'src/generated/graphql';
import { getAllProducts } from 'src/utils/getAllProducts';

interface Props {
  products: Product[];
}
export default function ProductListPage(props: Props) {
  return (
    <MainLayout>
      <MetaTags title="Products" />
      <div className="container-1400">
        <ProductList products={props.products} />
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const products = await getAllProducts(query);
  return { props: { products } };
};
