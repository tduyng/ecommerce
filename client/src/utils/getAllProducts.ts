import { gql } from '@apollo/client';
import { Product } from 'src/generated/graphql';
import { createApolloClient } from './apollo';

export const getAllProducts = async (
  query: any,
  limitDefault = 25,
): Promise<Product[]> => {
  const apolloClient = createApolloClient();
  const { category, brand } = query;
  let filteredProducts: Product[] = [];
  const limit = Number(query.limit as string) || limitDefault;

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
      variables: { brand, pagination: { limit } },
    });
    filteredProducts = data?.productsByBrand.products as Product[];
  }
  if (!category && !brand) {
    const queryFilter = gql`
      query Products($pagination: PaginationInput) {
        products(pagination: $pagination) {
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
      variables: { brand, pagination: { limit } },
    });
    filteredProducts = data?.products.products as Product[];
  }
  return filteredProducts;
};
