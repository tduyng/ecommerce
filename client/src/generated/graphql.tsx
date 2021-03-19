import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AuthToken = {
  __typename?: 'AuthToken';
  accessToken?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};

export type AuthTokenResponse = {
  __typename?: 'AuthTokenResponse';
  authToken?: Maybe<AuthToken>;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type CreateOrderInput = {
  orderItems: Array<OrderItemInput>;
  paymentMethod: Scalars['String'];
  paymentResult: PaymentResultInput;
  shippingAddress: ShippingAddressInput;
  shippingPrice: Scalars['Float'];
  taxPrice: Scalars['Float'];
  totalPrice: Scalars['Float'];
};

export type CreateProductInput = {
  brand: Scalars['String'];
  category: Scalars['String'];
  countInStock?: Maybe<Scalars['Int']>;
  description: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  numReviews?: Maybe<Scalars['Int']>;
  price: Scalars['Float'];
};

export type CreateReviewProductInput = {
  comment: Scalars['String'];
  rating: Scalars['Int'];
};

export type LoginUserInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type MessageError = {
  __typename?: 'MessageError';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  activate: AuthTokenResponse;
  autoRefresh: AuthTokenResponse;
  changePassword: UserResponse;
  createOrder: Order;
  createProduct: Product;
  deleteProduct: Scalars['Boolean'];
  deleteUserById: Scalars['Boolean'];
  deliveryOrder: Order;
  forgotPassword: TokenResponse;
  login: AuthTokenResponse;
  logout: Scalars['Boolean'];
  payOrder: Order;
  refresh: AuthTokenResponse;
  register: TokenResponse;
  resetPassword: UserResponse;
  reviewProduct: Product;
  updateProduct: Product;
  updateUser: UserResponse;
};

export type MutationActivateArgs = {
  token: Scalars['String'];
};

export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};

export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};

export type MutationCreateProductArgs = {
  input: CreateProductInput;
};

export type MutationDeleteProductArgs = {
  _id: Scalars['String'];
};

export type MutationDeleteUserByIdArgs = {
  id: Scalars['String'];
};

export type MutationDeliveryOrderArgs = {
  _id: Scalars['String'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationLoginArgs = {
  input: LoginUserInput;
};

export type MutationPayOrderArgs = {
  _id: Scalars['String'];
  paymentResult: PaymentResultInput;
};

export type MutationRegisterArgs = {
  input: RegisterUserInput;
};

export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};

export type MutationReviewProductArgs = {
  input: CreateReviewProductInput;
  productId: Scalars['String'];
};

export type MutationUpdateProductArgs = {
  _id: Scalars['String'];
  input: UpdateProductInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars['String'];
  input: UpdateUserInput;
};

export type Order = {
  __typename?: 'Order';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  deliveredAt?: Maybe<Scalars['DateTime']>;
  isDelivered: Scalars['Boolean'];
  isPaid: Scalars['Boolean'];
  orderItems: Array<OrderItem>;
  paidAt?: Maybe<Scalars['DateTime']>;
  paymentMethod: Scalars['String'];
  paymentResult: PaymentResult;
  shippingAddress: ShippingAddress;
  shippingPrice: Scalars['Float'];
  taxPrice: Scalars['Float'];
  totalPrice: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  image: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  product: Product;
  quantity: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type OrderItemInput = {
  image: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  product: Scalars['String'];
  quantity?: Maybe<Scalars['Int']>;
};

export type PaginatedOrder = {
  __typename?: 'PaginatedOrder';
  count: Scalars['Int'];
  orders: Array<Order>;
};

export type PaginatedProduct = {
  __typename?: 'PaginatedProduct';
  count: Scalars['Int'];
  products: Array<Product>;
};

export type PaginatedUser = {
  __typename?: 'PaginatedUser';
  count: Scalars['Int'];
  users: Array<User>;
};

export type PaginationInput = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

export type PaymentResult = {
  __typename?: 'PaymentResult';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  status: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PaymentResultInput = {
  email: Scalars['String'];
  status: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  _id: Scalars['ID'];
  brand: Scalars['String'];
  category: Scalars['String'];
  countInStock: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
  numReviews: Scalars['Int'];
  price: Scalars['Float'];
  rating: Scalars['Int'];
  reviews: Array<Review>;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  getManyOrders: PaginatedOrder;
  me: UserResponse;
  myOrders: PaginatedOrder;
  orderById: Order;
  productById: Product;
  products: PaginatedProduct;
  productsByBrand: PaginatedProduct;
  productsByCategory: PaginatedProduct;
  queryProducts: PaginatedProduct;
  searchUsers: PaginatedUser;
  topProducts: Array<Product>;
  userByEmail: UserResponse;
  userById: UserResponse;
  userByUsername: UserResponse;
};

export type QueryGetManyOrdersArgs = {
  pagination?: Maybe<PaginationInput>;
};

export type QueryMyOrdersArgs = {
  pagination?: Maybe<PaginationInput>;
};

export type QueryOrderByIdArgs = {
  _id: Scalars['String'];
};

export type QueryProductByIdArgs = {
  _id: Scalars['String'];
};

export type QueryProductsArgs = {
  pagination?: Maybe<PaginationInput>;
};

export type QueryProductsByBrandArgs = {
  brand: Scalars['String'];
  pagination?: Maybe<PaginationInput>;
};

export type QueryProductsByCategoryArgs = {
  category: Scalars['String'];
  pagination?: Maybe<PaginationInput>;
};

export type QueryQueryProductsArgs = {
  pagination?: Maybe<PaginationInput>;
  q: Scalars['String'];
};

export type QuerySearchUsersArgs = {
  limit?: Maybe<Scalars['Float']>;
  page?: Maybe<Scalars['Float']>;
  q: Scalars['String'];
};

export type QueryTopProductsArgs = {
  limit?: Maybe<Scalars['Float']>;
};

export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};

export type QueryUserByIdArgs = {
  id: Scalars['String'];
};

export type QueryUserByUsernameArgs = {
  username: Scalars['String'];
};

export type RegisterUserInput = {
  avatar?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  fullName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type ResetPasswordInput = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type Review = {
  __typename?: 'Review';
  _id: Scalars['ID'];
  comment: Scalars['String'];
  createdAt: Scalars['DateTime'];
  rating: Scalars['Int'];
  reviewerName: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type ShippingAddress = {
  __typename?: 'ShippingAddress';
  _id: Scalars['ID'];
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  createdAt: Scalars['DateTime'];
  postalCode: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ShippingAddressInput = {
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  postalCode: Scalars['String'];
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  token?: Maybe<Scalars['String']>;
};

export type UpdateProductInput = {
  brand?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  countInStock?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
};

export type UpdateUserInput = {
  avatar?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  fullName?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<MessageError>;
  user?: Maybe<User>;
};

export type RegularOrderFragment = { __typename?: 'Order' } & Pick<
  Order,
  | 'paymentMethod'
  | 'taxPrice'
  | 'shippingPrice'
  | 'totalPrice'
  | 'isPaid'
  | 'paidAt'
  | 'isDelivered'
  | 'deliveredAt'
> & {
    orderItems: Array<{ __typename?: 'OrderItem' } & RegularOrderItemFragment>;
    shippingAddress: { __typename?: 'ShippingAddress' } & RegularShippingAddressFragment;
    paymentResult: { __typename?: 'PaymentResult' } & RegularPaymentResultFragment;
    user: { __typename?: 'User' } & RegularUserFragment;
  };

export type RegularOrderItemFragment = { __typename?: 'OrderItem' } & Pick<
  OrderItem,
  '_id' | 'name' | 'quantity' | 'price' | 'image'
> & { product: { __typename?: 'Product' } & RegularProductFragment };

export type RegularPaymentResultFragment = { __typename?: 'PaymentResult' } & Pick<
  PaymentResult,
  '_id' | 'status' | 'email'
>;

export type RegularProductFragment = { __typename?: 'Product' } & Pick<
  Product,
  '_id' | 'brand' | 'category' | 'name' | 'image' | 'price' | 'numReviews' | 'rating'
> & {
    reviews: Array<{ __typename?: 'Review' } & RegularReviewFragment>;
    user: { __typename?: 'User' } & RegularUserFragment;
  };

export type RegularReviewFragment = { __typename?: 'Review' } & Pick<
  Review,
  '_id' | 'rating' | 'comment'
>;

export type RegularShippingAddressFragment = { __typename?: 'ShippingAddress' } & Pick<
  ShippingAddress,
  '_id' | 'address' | 'city' | 'postalCode' | 'country'
>;

export type RegularUserFragment = { __typename?: 'User' } & Pick<
  User,
  '_id' | 'username' | 'email' | 'fullName' | 'avatar'
>;

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'UserResponse' } & {
    user?: Maybe<
      { __typename?: 'User' } & Pick<
        User,
        '_id' | 'username' | 'email' | 'fullName' | 'avatar'
      >
    >;
    error?: Maybe<{ __typename?: 'MessageError' } & Pick<MessageError, 'message'>>;
  };
};

export const RegularReviewFragmentDoc = gql`
  fragment RegularReview on Review {
    _id
    rating
    comment
  }
`;
export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    _id
    username
    email
    fullName
    avatar
  }
`;
export const RegularProductFragmentDoc = gql`
  fragment RegularProduct on Product {
    _id
    brand
    category
    name
    image
    price
    numReviews
    rating
    reviews {
      ...RegularReview
    }
    user {
      ...RegularUser
    }
  }
  ${RegularReviewFragmentDoc}
  ${RegularUserFragmentDoc}
`;
export const RegularOrderItemFragmentDoc = gql`
  fragment RegularOrderItem on OrderItem {
    _id
    name
    quantity
    price
    image
    product {
      ...RegularProduct
    }
  }
  ${RegularProductFragmentDoc}
`;
export const RegularShippingAddressFragmentDoc = gql`
  fragment RegularShippingAddress on ShippingAddress {
    _id
    address
    city
    postalCode
    country
  }
`;
export const RegularPaymentResultFragmentDoc = gql`
  fragment RegularPaymentResult on PaymentResult {
    _id
    status
    email
  }
`;
export const RegularOrderFragmentDoc = gql`
  fragment RegularOrder on Order {
    paymentMethod
    taxPrice
    shippingPrice
    totalPrice
    isPaid
    paidAt
    isDelivered
    deliveredAt
    orderItems {
      ...RegularOrderItem
    }
    shippingAddress {
      ...RegularShippingAddress
    }
    paymentResult {
      ...RegularPaymentResult
    }
    user {
      ...RegularUser
    }
  }
  ${RegularOrderItemFragmentDoc}
  ${RegularShippingAddressFragmentDoc}
  ${RegularPaymentResultFragmentDoc}
  ${RegularUserFragmentDoc}
`;
export const MeDocument = gql`
  query Me {
    me {
      user {
        _id
        username
        email
        fullName
        avatar
      }
      error {
        message
      }
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
