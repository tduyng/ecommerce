import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client';

import { GetServerSideProps } from 'next';
import React from 'react';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';
import { MetaTags } from 'src/app/components/Layouts/MetaTags';
import { ProductList } from 'src/app/components/Products/ProductList';
import { Product } from 'src/generated/graphql';
import { createApolloClient } from 'src/utils/apollo';

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
  const apolloClient = createApolloClient();
  const { category, brand } = query;
  let filteredProducts: Product[] = [];
  const limit = Number(query.limit as string) || 1000;

  if (category && !brand) {
    const queryFilter = gql`
      query ProductsByCategory($category: String!, $pagination: PaginationInput) {
        productsByCategory(category: $category, pagination: $pagination) {
          count

          products {
            _id
            brand
            category
            name
            image
            price
            numReviews
            rating
            reviews {
              _id
              rating
              comment
            }
            user {
              _id
              username
              email
              fullName
              avatar
              role
            }
          }
        }
      }
    `;
    const { data } = await apolloClient.query({
      query: queryFilter,
      variables: { category, pagination: { limit } },
    });
    filteredProducts = data?.productsByCategory.products as Product[];
  }

  if (!category && brand) {
    const queryFilter = gql`
      query ProductsByBrand($brand: String!, $pagination: PaginationInput) {
        productsByBrand(brand: $brand, pagination: $pagination) {
          count

          products {
            products {
              _id
              brand
              category
              name
              image
              price
              numReviews
              rating
              reviews {
                _id
                rating
                comment
              }
              user {
                _id
                username
                email
                fullName
                avatar
                role
              }
            }
          }
        }
      }
    `;
    const { data } = await apolloClient.query({
      query: queryFilter,
      variables: { brand, pagination: { limit } },
    });
    filteredProducts = data?.productsByBrand.products as Product[];
  }
  if (!category && !brand) {
    const queryFilter = gql`
      query {
        products(pagination: { limit: limit }) {
          count

          products {
            products {
              _id
              brand
              category
              name
              image
              price
              numReviews
              rating
              reviews {
                _id
                rating
                comment
              }
              user {
                _id
                username
                email
                fullName
                avatar
                role
              }
            }
          }
        }
      }
    `;
    const { data } = await apolloClient.query({
      query: queryFilter,
      variables: { brand, pagination: { limit } },
    });
    filteredProducts = data?.productsByBrand.products as Product[];
  }

  return { props: { products: filteredProducts } };
};
