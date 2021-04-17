import { GetServerSideProps } from 'next';
import React from 'react';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';
import { MetaTags } from 'src/app/components/Layouts/MetaTags';
import { AllProducts } from 'src/app/components/Products/AllProducts';
import { Product } from 'src/generated/graphql';
import { getAllProducts } from 'src/utils/getAllProducts';

interface Props {
  products: Product[];
}
export default function ProductsPage(props: Props) {
  return (
    <MainLayout>
      <MetaTags title="Products" />
      <div className="container-1400">
        <AllProducts products={props.products} />
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const products = await getAllProducts(query);
  return { props: { products } };
};
