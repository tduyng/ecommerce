import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
  user?: Maybe<User>;
};

export type CartItem = {
  __typename?: 'CartItem';
  price: Scalars['Float'];
  product: ProductCart;
  quantity: Scalars['Int'];
};

export type CartItemInput = {
  price: Scalars['Float'];
  product: ProductInput;
  quantity: Scalars['Int'];
};

export type CategoryBrands = {
  __typename?: 'CategoryBrands';
  brands: Array<Scalars['String']>;
  category: Scalars['String'];
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
  addToCart: Array<CartItem>;
  adminCreateProduct: Product;
  adminDeleteProduct: Scalars['Boolean'];
  adminDeleteUserById: Scalars['Boolean'];
  adminSetDeliveryOrder: Order;
  adminUpdateProduct: Product;
  adminUpdateUserById: UserResponse;
  autoRefresh: AuthTokenResponse;
  changePassword: UserResponse;
  createOrder: Order;
  forgotPassword: TokenResponse;
  login: AuthTokenResponse;
  logout: Scalars['Boolean'];
  payOrder: Order;
  refresh: AuthTokenResponse;
  register: TokenResponse;
  removeItemFromCart: Array<CartItem>;
  resetPassword: UserResponse;
  reviewProduct: Product;
  updateCart: Array<CartItem>;
  updateProfile: UserResponse;
};


export type MutationActivateArgs = {
  token: Scalars['String'];
};


export type MutationAddToCartArgs = {
  input: CartItemInput;
};


export type MutationAdminCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationAdminDeleteProductArgs = {
  _id: Scalars['String'];
};


export type MutationAdminDeleteUserByIdArgs = {
  _id: Scalars['String'];
};


export type MutationAdminSetDeliveryOrderArgs = {
  _id: Scalars['String'];
};


export type MutationAdminUpdateProductArgs = {
  _id: Scalars['String'];
  input: UpdateProductInput;
};


export type MutationAdminUpdateUserByIdArgs = {
  _id: Scalars['String'];
  input: UpdateUserInput;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
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


export type MutationRemoveItemFromCartArgs = {
  productId: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationReviewProductArgs = {
  input: CreateReviewProductInput;
  productId: Scalars['String'];
};


export type MutationUpdateCartArgs = {
  input: CartItemInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
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
  price: Scalars['Float'];
  product: ProductInput;
  quantity: Scalars['Int'];
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

export type ProductCart = {
  __typename?: 'ProductCart';
  _id: Scalars['ID'];
  brand: Scalars['String'];
  category: Scalars['String'];
  countInStock: Scalars['Int'];
  description: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
  numReviews: Scalars['Int'];
  price: Scalars['Float'];
  rating: Scalars['Int'];
};

export type ProductInput = {
  _id: Scalars['ID'];
  brand: Scalars['String'];
  category: Scalars['String'];
  countInStock?: Maybe<Scalars['Int']>;
  description: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
  numReviews?: Maybe<Scalars['Int']>;
  price: Scalars['Float'];
  rating?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  adminGetOrders: PaginatedOrder;
  adminGetUserByEmail: UserResponse;
  adminGetUserById: UserResponse;
  adminGetUserByUsername: UserResponse;
  adminSearchUsers: PaginatedUser;
  allCategories: Array<Scalars['String']>;
  brandsByCategory: Array<Scalars['String']>;
  categoryBrands: Array<CategoryBrands>;
  latestProducts: Array<Product>;
  me: UserResponse;
  myOrders: PaginatedOrder;
  orderById: Order;
  productById: Product;
  products: PaginatedProduct;
  productsByBrand: PaginatedProduct;
  productsByCategory: PaginatedProduct;
  queryProducts: PaginatedProduct;
  topProducts: Array<Product>;
};


export type QueryAdminGetOrdersArgs = {
  pagination?: Maybe<PaginationInput>;
};


export type QueryAdminGetUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryAdminGetUserByIdArgs = {
  _id: Scalars['String'];
};


export type QueryAdminGetUserByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryAdminSearchUsersArgs = {
  pagination?: Maybe<PaginationInput>;
  q: Scalars['String'];
};


export type QueryBrandsByCategoryArgs = {
  category: Scalars['String'];
};


export type QueryLatestProductsArgs = {
  limit?: Maybe<Scalars['Int']>;
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


export type QueryTopProductsArgs = {
  limit?: Maybe<Scalars['Int']>;
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

export type UpdateProfileInput = {
  avatar?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
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

export type RegularCartItemFragment = (
  { __typename?: 'CartItem' }
  & Pick<CartItem, 'price' | 'quantity'>
  & { product: (
    { __typename?: 'ProductCart' }
    & RegularProductCartFragment
  ) }
);

export type RegularOrderFragment = (
  { __typename?: 'Order' }
  & Pick<Order, 'paymentMethod' | 'taxPrice' | 'shippingPrice' | 'totalPrice' | 'isPaid' | 'paidAt' | 'isDelivered' | 'deliveredAt'>
  & { orderItems: Array<(
    { __typename?: 'OrderItem' }
    & RegularOrderItemFragment
  )>, shippingAddress: (
    { __typename?: 'ShippingAddress' }
    & RegularShippingAddressFragment
  ), paymentResult: (
    { __typename?: 'PaymentResult' }
    & RegularPaymentResultFragment
  ), user: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type RegularOrderItemFragment = (
  { __typename?: 'OrderItem' }
  & Pick<OrderItem, '_id' | 'name' | 'quantity' | 'price' | 'image'>
  & { product: (
    { __typename?: 'Product' }
    & RegularProductFragment
  ) }
);

export type RegularPaymentResultFragment = (
  { __typename?: 'PaymentResult' }
  & Pick<PaymentResult, '_id' | 'status' | 'email'>
);

export type RegularProductFragment = (
  { __typename?: 'Product' }
  & Pick<Product, '_id' | 'brand' | 'category' | 'name' | 'image' | 'price' | 'numReviews' | 'rating'>
  & { reviews: Array<(
    { __typename?: 'Review' }
    & RegularReviewFragment
  )>, user: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type RegularProductCartFragment = (
  { __typename?: 'ProductCart' }
  & Pick<ProductCart, '_id' | 'brand' | 'category' | 'countInStock' | 'description' | 'image' | 'name' | 'numReviews' | 'price' | 'rating'>
);

export type RegularReviewFragment = (
  { __typename?: 'Review' }
  & Pick<Review, '_id' | 'rating' | 'comment'>
);

export type RegularShippingAddressFragment = (
  { __typename?: 'ShippingAddress' }
  & Pick<ShippingAddress, '_id' | 'address' | 'city' | 'postalCode' | 'country'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'username' | 'email' | 'fullName' | 'avatar' | 'role'>
);

export type ActivateMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ActivateMutation = (
  { __typename?: 'Mutation' }
  & { activate: (
    { __typename?: 'AuthTokenResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )>, authToken?: Maybe<(
      { __typename?: 'AuthToken' }
      & Pick<AuthToken, 'accessToken'>
    )> }
  ) }
);

export type AddToCartMutationVariables = Exact<{
  input: CartItemInput;
}>;


export type AddToCartMutation = (
  { __typename?: 'Mutation' }
  & { addToCart: Array<(
    { __typename?: 'CartItem' }
    & RegularCartItemFragment
  )> }
);

export type AdminCreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type AdminCreateProductMutation = (
  { __typename?: 'Mutation' }
  & { adminCreateProduct: (
    { __typename?: 'Product' }
    & RegularProductFragment
  ) }
);

export type AdminDeleteProductMutationVariables = Exact<{
  _id: Scalars['String'];
}>;


export type AdminDeleteProductMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'adminDeleteProduct'>
);

export type AdminDeleteUserByIdMutationVariables = Exact<{
  _id: Scalars['String'];
}>;


export type AdminDeleteUserByIdMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'adminDeleteUserById'>
);

export type AdminSetDeliveryOrderMutationVariables = Exact<{
  _id: Scalars['String'];
}>;


export type AdminSetDeliveryOrderMutation = (
  { __typename?: 'Mutation' }
  & { adminSetDeliveryOrder: (
    { __typename?: 'Order' }
    & RegularOrderFragment
  ) }
);

export type AdminUpdateUserByIdMutationVariables = Exact<{
  _id: Scalars['String'];
  input: UpdateUserInput;
}>;


export type AdminUpdateUserByIdMutation = (
  { __typename?: 'Mutation' }
  & { adminUpdateUserById: (
    { __typename?: 'UserResponse' }
    & { error?: Maybe<(
      { __typename?: 'MessageError' }
      & Pick<MessageError, 'message'>
    )>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type AutoRefreshMutationVariables = Exact<{ [key: string]: never; }>;


export type AutoRefreshMutation = (
  { __typename?: 'Mutation' }
  & { autoRefresh: (
    { __typename?: 'AuthTokenResponse' }
    & { authToken?: Maybe<(
      { __typename?: 'AuthToken' }
      & Pick<AuthToken, 'accessToken'>
    )>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & { error?: Maybe<(
      { __typename?: 'MessageError' }
      & Pick<MessageError, 'message'>
    )>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;


export type CreateOrderMutation = (
  { __typename?: 'Mutation' }
  & { createOrder: (
    { __typename?: 'Order' }
    & RegularOrderFragment
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPassword: (
    { __typename?: 'TokenResponse' }
    & Pick<TokenResponse, 'token'>
  ) }
);

export type LoginMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthTokenResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )>, authToken?: Maybe<(
      { __typename?: 'AuthToken' }
      & Pick<AuthToken, 'accessToken'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type PayOrderMutationVariables = Exact<{
  _id: Scalars['String'];
  paymentResult: PaymentResultInput;
}>;


export type PayOrderMutation = (
  { __typename?: 'Mutation' }
  & { payOrder: (
    { __typename?: 'Order' }
    & RegularOrderFragment
  ) }
);

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = (
  { __typename?: 'Mutation' }
  & { refresh: (
    { __typename?: 'AuthTokenResponse' }
    & { authToken?: Maybe<(
      { __typename?: 'AuthToken' }
      & Pick<AuthToken, 'accessToken' | 'refreshToken'>
    )> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  input: RegisterUserInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'TokenResponse' }
    & Pick<TokenResponse, 'token'>
  ) }
);

export type RemoveItemFromCartMutationVariables = Exact<{
  productId: Scalars['String'];
}>;


export type RemoveItemFromCartMutation = (
  { __typename?: 'Mutation' }
  & { removeItemFromCart: Array<(
    { __typename?: 'CartItem' }
    & RegularCartItemFragment
  )> }
);

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword: (
    { __typename?: 'UserResponse' }
    & { error?: Maybe<(
      { __typename?: 'MessageError' }
      & Pick<MessageError, 'message'>
    )>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type ReviewProductMutationVariables = Exact<{
  productId: Scalars['String'];
  input: CreateReviewProductInput;
}>;


export type ReviewProductMutation = (
  { __typename?: 'Mutation' }
  & { reviewProduct: (
    { __typename?: 'Product' }
    & RegularProductFragment
  ) }
);

export type UpdateCartMutationVariables = Exact<{
  input: CartItemInput;
}>;


export type UpdateCartMutation = (
  { __typename?: 'Mutation' }
  & { updateCart: Array<(
    { __typename?: 'CartItem' }
    & RegularCartItemFragment
  )> }
);

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateProfile: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type AdminGetOrdersQueryVariables = Exact<{
  pagination?: Maybe<PaginationInput>;
}>;


export type AdminGetOrdersQuery = (
  { __typename?: 'Query' }
  & { adminGetOrders: (
    { __typename?: 'PaginatedOrder' }
    & Pick<PaginatedOrder, 'count'>
    & { orders: Array<(
      { __typename?: 'Order' }
      & RegularOrderFragment
    )> }
  ) }
);

export type AdminSearchUsersQueryVariables = Exact<{
  q: Scalars['String'];
  pagination?: Maybe<PaginationInput>;
}>;


export type AdminSearchUsersQuery = (
  { __typename?: 'Query' }
  & { adminSearchUsers: (
    { __typename?: 'PaginatedUser' }
    & Pick<PaginatedUser, 'count'>
    & { users: Array<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type AllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCategoriesQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'allCategories'>
);

export type BrandsByCategoryQueryVariables = Exact<{
  category: Scalars['String'];
}>;


export type BrandsByCategoryQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'brandsByCategory'>
);

export type CategoryBrandsQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoryBrandsQuery = (
  { __typename?: 'Query' }
  & { categoryBrands: Array<(
    { __typename?: 'CategoryBrands' }
    & Pick<CategoryBrands, 'category' | 'brands'>
  )> }
);

export type LatestProductsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
}>;


export type LatestProductsQuery = (
  { __typename?: 'Query' }
  & { latestProducts: Array<(
    { __typename?: 'Product' }
    & RegularProductFragment
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )>, error?: Maybe<(
      { __typename?: 'MessageError' }
      & Pick<MessageError, 'message'>
    )> }
  ) }
);

export type MyOrdersQueryVariables = Exact<{
  pagination?: Maybe<PaginationInput>;
}>;


export type MyOrdersQuery = (
  { __typename?: 'Query' }
  & { myOrders: (
    { __typename?: 'PaginatedOrder' }
    & Pick<PaginatedOrder, 'count'>
    & { orders: Array<(
      { __typename?: 'Order' }
      & RegularOrderFragment
    )> }
  ) }
);

export type OrderByIdQueryVariables = Exact<{
  _id: Scalars['String'];
}>;


export type OrderByIdQuery = (
  { __typename?: 'Query' }
  & { orderById: (
    { __typename?: 'Order' }
    & RegularOrderFragment
  ) }
);

export type ProductsByBrandQueryVariables = Exact<{
  brand: Scalars['String'];
  pagination?: Maybe<PaginationInput>;
}>;


export type ProductsByBrandQuery = (
  { __typename?: 'Query' }
  & { productsByBrand: (
    { __typename?: 'PaginatedProduct' }
    & Pick<PaginatedProduct, 'count'>
    & { products: Array<(
      { __typename?: 'Product' }
      & RegularProductFragment
    )> }
  ) }
);

export type ProductsByCategoryQueryVariables = Exact<{
  category: Scalars['String'];
  pagination?: Maybe<PaginationInput>;
}>;


export type ProductsByCategoryQuery = (
  { __typename?: 'Query' }
  & { productsByCategory: (
    { __typename?: 'PaginatedProduct' }
    & Pick<PaginatedProduct, 'count'>
    & { products: Array<(
      { __typename?: 'Product' }
      & RegularProductFragment
    )> }
  ) }
);

export type ProductByIdQueryVariables = Exact<{
  _id: Scalars['String'];
}>;


export type ProductByIdQuery = (
  { __typename?: 'Query' }
  & { productById: (
    { __typename?: 'Product' }
    & RegularProductFragment
  ) }
);

export type ProductsQueryVariables = Exact<{
  pagination?: Maybe<PaginationInput>;
}>;


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { products: (
    { __typename?: 'PaginatedProduct' }
    & Pick<PaginatedProduct, 'count'>
    & { products: Array<(
      { __typename?: 'Product' }
      & RegularProductFragment
    )> }
  ) }
);

export type QueryProductsQueryVariables = Exact<{
  q: Scalars['String'];
  pagination?: Maybe<PaginationInput>;
}>;


export type QueryProductsQuery = (
  { __typename?: 'Query' }
  & { queryProducts: (
    { __typename?: 'PaginatedProduct' }
    & Pick<PaginatedProduct, 'count'>
    & { products: Array<(
      { __typename?: 'Product' }
      & RegularProductFragment
    )> }
  ) }
);

export type TopProductsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
}>;


export type TopProductsQuery = (
  { __typename?: 'Query' }
  & { topProducts: Array<(
    { __typename?: 'Product' }
    & RegularProductFragment
  )> }
);

export const RegularProductCartFragmentDoc = gql`
    fragment RegularProductCart on ProductCart {
  _id
  brand
  category
  countInStock
  description
  image
  name
  numReviews
  price
  rating
}
    `;
export const RegularCartItemFragmentDoc = gql`
    fragment RegularCartItem on CartItem {
  price
  quantity
  product {
    ...RegularProductCart
  }
}
    ${RegularProductCartFragmentDoc}`;
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
  role
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
${RegularUserFragmentDoc}`;
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
    ${RegularProductFragmentDoc}`;
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
${RegularUserFragmentDoc}`;
export const ActivateDocument = gql`
    mutation Activate($token: String!) {
  activate(token: $token) {
    user {
      ...RegularUser
    }
    authToken {
      accessToken
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type ActivateMutationFn = Apollo.MutationFunction<ActivateMutation, ActivateMutationVariables>;

/**
 * __useActivateMutation__
 *
 * To run a mutation, you first call `useActivateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateMutation, { data, loading, error }] = useActivateMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useActivateMutation(baseOptions?: Apollo.MutationHookOptions<ActivateMutation, ActivateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateMutation, ActivateMutationVariables>(ActivateDocument, options);
      }
export type ActivateMutationHookResult = ReturnType<typeof useActivateMutation>;
export type ActivateMutationResult = Apollo.MutationResult<ActivateMutation>;
export type ActivateMutationOptions = Apollo.BaseMutationOptions<ActivateMutation, ActivateMutationVariables>;
export const AddToCartDocument = gql`
    mutation AddToCart($input: CartItemInput!) {
  addToCart(input: $input) {
    ...RegularCartItem
  }
}
    ${RegularCartItemFragmentDoc}`;
export type AddToCartMutationFn = Apollo.MutationFunction<AddToCartMutation, AddToCartMutationVariables>;

/**
 * __useAddToCartMutation__
 *
 * To run a mutation, you first call `useAddToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToCartMutation, { data, loading, error }] = useAddToCartMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddToCartMutation(baseOptions?: Apollo.MutationHookOptions<AddToCartMutation, AddToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToCartMutation, AddToCartMutationVariables>(AddToCartDocument, options);
      }
export type AddToCartMutationHookResult = ReturnType<typeof useAddToCartMutation>;
export type AddToCartMutationResult = Apollo.MutationResult<AddToCartMutation>;
export type AddToCartMutationOptions = Apollo.BaseMutationOptions<AddToCartMutation, AddToCartMutationVariables>;
export const AdminCreateProductDocument = gql`
    mutation AdminCreateProduct($input: CreateProductInput!) {
  adminCreateProduct(input: $input) {
    ...RegularProduct
  }
}
    ${RegularProductFragmentDoc}`;
export type AdminCreateProductMutationFn = Apollo.MutationFunction<AdminCreateProductMutation, AdminCreateProductMutationVariables>;

/**
 * __useAdminCreateProductMutation__
 *
 * To run a mutation, you first call `useAdminCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminCreateProductMutation, { data, loading, error }] = useAdminCreateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<AdminCreateProductMutation, AdminCreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminCreateProductMutation, AdminCreateProductMutationVariables>(AdminCreateProductDocument, options);
      }
export type AdminCreateProductMutationHookResult = ReturnType<typeof useAdminCreateProductMutation>;
export type AdminCreateProductMutationResult = Apollo.MutationResult<AdminCreateProductMutation>;
export type AdminCreateProductMutationOptions = Apollo.BaseMutationOptions<AdminCreateProductMutation, AdminCreateProductMutationVariables>;
export const AdminDeleteProductDocument = gql`
    mutation AdminDeleteProduct($_id: String!) {
  adminDeleteProduct(_id: $_id)
}
    `;
export type AdminDeleteProductMutationFn = Apollo.MutationFunction<AdminDeleteProductMutation, AdminDeleteProductMutationVariables>;

/**
 * __useAdminDeleteProductMutation__
 *
 * To run a mutation, you first call `useAdminDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteProductMutation, { data, loading, error }] = useAdminDeleteProductMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useAdminDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<AdminDeleteProductMutation, AdminDeleteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminDeleteProductMutation, AdminDeleteProductMutationVariables>(AdminDeleteProductDocument, options);
      }
export type AdminDeleteProductMutationHookResult = ReturnType<typeof useAdminDeleteProductMutation>;
export type AdminDeleteProductMutationResult = Apollo.MutationResult<AdminDeleteProductMutation>;
export type AdminDeleteProductMutationOptions = Apollo.BaseMutationOptions<AdminDeleteProductMutation, AdminDeleteProductMutationVariables>;
export const AdminDeleteUserByIdDocument = gql`
    mutation AdminDeleteUserById($_id: String!) {
  adminDeleteUserById(_id: $_id)
}
    `;
export type AdminDeleteUserByIdMutationFn = Apollo.MutationFunction<AdminDeleteUserByIdMutation, AdminDeleteUserByIdMutationVariables>;

/**
 * __useAdminDeleteUserByIdMutation__
 *
 * To run a mutation, you first call `useAdminDeleteUserByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteUserByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteUserByIdMutation, { data, loading, error }] = useAdminDeleteUserByIdMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useAdminDeleteUserByIdMutation(baseOptions?: Apollo.MutationHookOptions<AdminDeleteUserByIdMutation, AdminDeleteUserByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminDeleteUserByIdMutation, AdminDeleteUserByIdMutationVariables>(AdminDeleteUserByIdDocument, options);
      }
export type AdminDeleteUserByIdMutationHookResult = ReturnType<typeof useAdminDeleteUserByIdMutation>;
export type AdminDeleteUserByIdMutationResult = Apollo.MutationResult<AdminDeleteUserByIdMutation>;
export type AdminDeleteUserByIdMutationOptions = Apollo.BaseMutationOptions<AdminDeleteUserByIdMutation, AdminDeleteUserByIdMutationVariables>;
export const AdminSetDeliveryOrderDocument = gql`
    mutation AdminSetDeliveryOrder($_id: String!) {
  adminSetDeliveryOrder(_id: $_id) {
    ...RegularOrder
  }
}
    ${RegularOrderFragmentDoc}`;
export type AdminSetDeliveryOrderMutationFn = Apollo.MutationFunction<AdminSetDeliveryOrderMutation, AdminSetDeliveryOrderMutationVariables>;

/**
 * __useAdminSetDeliveryOrderMutation__
 *
 * To run a mutation, you first call `useAdminSetDeliveryOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminSetDeliveryOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminSetDeliveryOrderMutation, { data, loading, error }] = useAdminSetDeliveryOrderMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useAdminSetDeliveryOrderMutation(baseOptions?: Apollo.MutationHookOptions<AdminSetDeliveryOrderMutation, AdminSetDeliveryOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminSetDeliveryOrderMutation, AdminSetDeliveryOrderMutationVariables>(AdminSetDeliveryOrderDocument, options);
      }
export type AdminSetDeliveryOrderMutationHookResult = ReturnType<typeof useAdminSetDeliveryOrderMutation>;
export type AdminSetDeliveryOrderMutationResult = Apollo.MutationResult<AdminSetDeliveryOrderMutation>;
export type AdminSetDeliveryOrderMutationOptions = Apollo.BaseMutationOptions<AdminSetDeliveryOrderMutation, AdminSetDeliveryOrderMutationVariables>;
export const AdminUpdateUserByIdDocument = gql`
    mutation AdminUpdateUserById($_id: String!, $input: UpdateUserInput!) {
  adminUpdateUserById(_id: $_id, input: $input) {
    error {
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type AdminUpdateUserByIdMutationFn = Apollo.MutationFunction<AdminUpdateUserByIdMutation, AdminUpdateUserByIdMutationVariables>;

/**
 * __useAdminUpdateUserByIdMutation__
 *
 * To run a mutation, you first call `useAdminUpdateUserByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateUserByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateUserByIdMutation, { data, loading, error }] = useAdminUpdateUserByIdMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminUpdateUserByIdMutation(baseOptions?: Apollo.MutationHookOptions<AdminUpdateUserByIdMutation, AdminUpdateUserByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminUpdateUserByIdMutation, AdminUpdateUserByIdMutationVariables>(AdminUpdateUserByIdDocument, options);
      }
export type AdminUpdateUserByIdMutationHookResult = ReturnType<typeof useAdminUpdateUserByIdMutation>;
export type AdminUpdateUserByIdMutationResult = Apollo.MutationResult<AdminUpdateUserByIdMutation>;
export type AdminUpdateUserByIdMutationOptions = Apollo.BaseMutationOptions<AdminUpdateUserByIdMutation, AdminUpdateUserByIdMutationVariables>;
export const AutoRefreshDocument = gql`
    mutation AutoRefresh {
  autoRefresh {
    authToken {
      accessToken
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type AutoRefreshMutationFn = Apollo.MutationFunction<AutoRefreshMutation, AutoRefreshMutationVariables>;

/**
 * __useAutoRefreshMutation__
 *
 * To run a mutation, you first call `useAutoRefreshMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAutoRefreshMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [autoRefreshMutation, { data, loading, error }] = useAutoRefreshMutation({
 *   variables: {
 *   },
 * });
 */
export function useAutoRefreshMutation(baseOptions?: Apollo.MutationHookOptions<AutoRefreshMutation, AutoRefreshMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AutoRefreshMutation, AutoRefreshMutationVariables>(AutoRefreshDocument, options);
      }
export type AutoRefreshMutationHookResult = ReturnType<typeof useAutoRefreshMutation>;
export type AutoRefreshMutationResult = Apollo.MutationResult<AutoRefreshMutation>;
export type AutoRefreshMutationOptions = Apollo.BaseMutationOptions<AutoRefreshMutation, AutoRefreshMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    error {
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    ...RegularOrder
  }
}
    ${RegularOrderFragmentDoc}`;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    token
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginUserInput!) {
  login(input: $input) {
    user {
      ...RegularUser
    }
    authToken {
      accessToken
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const PayOrderDocument = gql`
    mutation PayOrder($_id: String!, $paymentResult: PaymentResultInput!) {
  payOrder(_id: $_id, paymentResult: $paymentResult) {
    ...RegularOrder
  }
}
    ${RegularOrderFragmentDoc}`;
export type PayOrderMutationFn = Apollo.MutationFunction<PayOrderMutation, PayOrderMutationVariables>;

/**
 * __usePayOrderMutation__
 *
 * To run a mutation, you first call `usePayOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePayOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [payOrderMutation, { data, loading, error }] = usePayOrderMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      paymentResult: // value for 'paymentResult'
 *   },
 * });
 */
export function usePayOrderMutation(baseOptions?: Apollo.MutationHookOptions<PayOrderMutation, PayOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PayOrderMutation, PayOrderMutationVariables>(PayOrderDocument, options);
      }
export type PayOrderMutationHookResult = ReturnType<typeof usePayOrderMutation>;
export type PayOrderMutationResult = Apollo.MutationResult<PayOrderMutation>;
export type PayOrderMutationOptions = Apollo.BaseMutationOptions<PayOrderMutation, PayOrderMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken {
  refresh {
    authToken {
      accessToken
      refreshToken
    }
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegisterUserInput!) {
  register(input: $input) {
    token
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveItemFromCartDocument = gql`
    mutation RemoveItemFromCart($productId: String!) {
  removeItemFromCart(productId: $productId) {
    ...RegularCartItem
  }
}
    ${RegularCartItemFragmentDoc}`;
export type RemoveItemFromCartMutationFn = Apollo.MutationFunction<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>;

/**
 * __useRemoveItemFromCartMutation__
 *
 * To run a mutation, you first call `useRemoveItemFromCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveItemFromCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeItemFromCartMutation, { data, loading, error }] = useRemoveItemFromCartMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useRemoveItemFromCartMutation(baseOptions?: Apollo.MutationHookOptions<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>(RemoveItemFromCartDocument, options);
      }
export type RemoveItemFromCartMutationHookResult = ReturnType<typeof useRemoveItemFromCartMutation>;
export type RemoveItemFromCartMutationResult = Apollo.MutationResult<RemoveItemFromCartMutation>;
export type RemoveItemFromCartMutationOptions = Apollo.BaseMutationOptions<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    error {
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ReviewProductDocument = gql`
    mutation ReviewProduct($productId: String!, $input: CreateReviewProductInput!) {
  reviewProduct(productId: $productId, input: $input) {
    ...RegularProduct
  }
}
    ${RegularProductFragmentDoc}`;
export type ReviewProductMutationFn = Apollo.MutationFunction<ReviewProductMutation, ReviewProductMutationVariables>;

/**
 * __useReviewProductMutation__
 *
 * To run a mutation, you first call `useReviewProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReviewProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reviewProductMutation, { data, loading, error }] = useReviewProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReviewProductMutation(baseOptions?: Apollo.MutationHookOptions<ReviewProductMutation, ReviewProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReviewProductMutation, ReviewProductMutationVariables>(ReviewProductDocument, options);
      }
export type ReviewProductMutationHookResult = ReturnType<typeof useReviewProductMutation>;
export type ReviewProductMutationResult = Apollo.MutationResult<ReviewProductMutation>;
export type ReviewProductMutationOptions = Apollo.BaseMutationOptions<ReviewProductMutation, ReviewProductMutationVariables>;
export const UpdateCartDocument = gql`
    mutation UpdateCart($input: CartItemInput!) {
  updateCart(input: $input) {
    ...RegularCartItem
  }
}
    ${RegularCartItemFragmentDoc}`;
export type UpdateCartMutationFn = Apollo.MutationFunction<UpdateCartMutation, UpdateCartMutationVariables>;

/**
 * __useUpdateCartMutation__
 *
 * To run a mutation, you first call `useUpdateCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCartMutation, { data, loading, error }] = useUpdateCartMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCartMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCartMutation, UpdateCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCartMutation, UpdateCartMutationVariables>(UpdateCartDocument, options);
      }
export type UpdateCartMutationHookResult = ReturnType<typeof useUpdateCartMutation>;
export type UpdateCartMutationResult = Apollo.MutationResult<UpdateCartMutation>;
export type UpdateCartMutationOptions = Apollo.BaseMutationOptions<UpdateCartMutation, UpdateCartMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const AdminGetOrdersDocument = gql`
    query AdminGetOrders($pagination: PaginationInput) {
  adminGetOrders(pagination: $pagination) {
    count
    orders {
      ...RegularOrder
    }
  }
}
    ${RegularOrderFragmentDoc}`;

/**
 * __useAdminGetOrdersQuery__
 *
 * To run a query within a React component, call `useAdminGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminGetOrdersQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useAdminGetOrdersQuery(baseOptions?: Apollo.QueryHookOptions<AdminGetOrdersQuery, AdminGetOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminGetOrdersQuery, AdminGetOrdersQueryVariables>(AdminGetOrdersDocument, options);
      }
export function useAdminGetOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminGetOrdersQuery, AdminGetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminGetOrdersQuery, AdminGetOrdersQueryVariables>(AdminGetOrdersDocument, options);
        }
export type AdminGetOrdersQueryHookResult = ReturnType<typeof useAdminGetOrdersQuery>;
export type AdminGetOrdersLazyQueryHookResult = ReturnType<typeof useAdminGetOrdersLazyQuery>;
export type AdminGetOrdersQueryResult = Apollo.QueryResult<AdminGetOrdersQuery, AdminGetOrdersQueryVariables>;
export const AdminSearchUsersDocument = gql`
    query AdminSearchUsers($q: String!, $pagination: PaginationInput) {
  adminSearchUsers(q: $q, pagination: $pagination) {
    count
    users {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useAdminSearchUsersQuery__
 *
 * To run a query within a React component, call `useAdminSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminSearchUsersQuery({
 *   variables: {
 *      q: // value for 'q'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useAdminSearchUsersQuery(baseOptions: Apollo.QueryHookOptions<AdminSearchUsersQuery, AdminSearchUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminSearchUsersQuery, AdminSearchUsersQueryVariables>(AdminSearchUsersDocument, options);
      }
export function useAdminSearchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminSearchUsersQuery, AdminSearchUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminSearchUsersQuery, AdminSearchUsersQueryVariables>(AdminSearchUsersDocument, options);
        }
export type AdminSearchUsersQueryHookResult = ReturnType<typeof useAdminSearchUsersQuery>;
export type AdminSearchUsersLazyQueryHookResult = ReturnType<typeof useAdminSearchUsersLazyQuery>;
export type AdminSearchUsersQueryResult = Apollo.QueryResult<AdminSearchUsersQuery, AdminSearchUsersQueryVariables>;
export const AllCategoriesDocument = gql`
    query AllCategories {
  allCategories
}
    `;

/**
 * __useAllCategoriesQuery__
 *
 * To run a query within a React component, call `useAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<AllCategoriesQuery, AllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllCategoriesQuery, AllCategoriesQueryVariables>(AllCategoriesDocument, options);
      }
export function useAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCategoriesQuery, AllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllCategoriesQuery, AllCategoriesQueryVariables>(AllCategoriesDocument, options);
        }
export type AllCategoriesQueryHookResult = ReturnType<typeof useAllCategoriesQuery>;
export type AllCategoriesLazyQueryHookResult = ReturnType<typeof useAllCategoriesLazyQuery>;
export type AllCategoriesQueryResult = Apollo.QueryResult<AllCategoriesQuery, AllCategoriesQueryVariables>;
export const BrandsByCategoryDocument = gql`
    query BrandsByCategory($category: String!) {
  brandsByCategory(category: $category)
}
    `;

/**
 * __useBrandsByCategoryQuery__
 *
 * To run a query within a React component, call `useBrandsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useBrandsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBrandsByCategoryQuery({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useBrandsByCategoryQuery(baseOptions: Apollo.QueryHookOptions<BrandsByCategoryQuery, BrandsByCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BrandsByCategoryQuery, BrandsByCategoryQueryVariables>(BrandsByCategoryDocument, options);
      }
export function useBrandsByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BrandsByCategoryQuery, BrandsByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BrandsByCategoryQuery, BrandsByCategoryQueryVariables>(BrandsByCategoryDocument, options);
        }
export type BrandsByCategoryQueryHookResult = ReturnType<typeof useBrandsByCategoryQuery>;
export type BrandsByCategoryLazyQueryHookResult = ReturnType<typeof useBrandsByCategoryLazyQuery>;
export type BrandsByCategoryQueryResult = Apollo.QueryResult<BrandsByCategoryQuery, BrandsByCategoryQueryVariables>;
export const CategoryBrandsDocument = gql`
    query CategoryBrands {
  categoryBrands {
    category
    brands
  }
}
    `;

/**
 * __useCategoryBrandsQuery__
 *
 * To run a query within a React component, call `useCategoryBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryBrandsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoryBrandsQuery(baseOptions?: Apollo.QueryHookOptions<CategoryBrandsQuery, CategoryBrandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryBrandsQuery, CategoryBrandsQueryVariables>(CategoryBrandsDocument, options);
      }
export function useCategoryBrandsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryBrandsQuery, CategoryBrandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryBrandsQuery, CategoryBrandsQueryVariables>(CategoryBrandsDocument, options);
        }
export type CategoryBrandsQueryHookResult = ReturnType<typeof useCategoryBrandsQuery>;
export type CategoryBrandsLazyQueryHookResult = ReturnType<typeof useCategoryBrandsLazyQuery>;
export type CategoryBrandsQueryResult = Apollo.QueryResult<CategoryBrandsQuery, CategoryBrandsQueryVariables>;
export const LatestProductsDocument = gql`
    query LatestProducts($limit: Int) {
  latestProducts(limit: $limit) {
    ...RegularProduct
  }
}
    ${RegularProductFragmentDoc}`;

/**
 * __useLatestProductsQuery__
 *
 * To run a query within a React component, call `useLatestProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLatestProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLatestProductsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useLatestProductsQuery(baseOptions?: Apollo.QueryHookOptions<LatestProductsQuery, LatestProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LatestProductsQuery, LatestProductsQueryVariables>(LatestProductsDocument, options);
      }
export function useLatestProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LatestProductsQuery, LatestProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LatestProductsQuery, LatestProductsQueryVariables>(LatestProductsDocument, options);
        }
export type LatestProductsQueryHookResult = ReturnType<typeof useLatestProductsQuery>;
export type LatestProductsLazyQueryHookResult = ReturnType<typeof useLatestProductsLazyQuery>;
export type LatestProductsQueryResult = Apollo.QueryResult<LatestProductsQuery, LatestProductsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    user {
      ...RegularUser
    }
    error {
      message
    }
  }
}
    ${RegularUserFragmentDoc}`;

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
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyOrdersDocument = gql`
    query MyOrders($pagination: PaginationInput) {
  myOrders(pagination: $pagination) {
    count
    orders {
      ...RegularOrder
    }
  }
}
    ${RegularOrderFragmentDoc}`;

/**
 * __useMyOrdersQuery__
 *
 * To run a query within a React component, call `useMyOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyOrdersQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useMyOrdersQuery(baseOptions?: Apollo.QueryHookOptions<MyOrdersQuery, MyOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyOrdersQuery, MyOrdersQueryVariables>(MyOrdersDocument, options);
      }
export function useMyOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyOrdersQuery, MyOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyOrdersQuery, MyOrdersQueryVariables>(MyOrdersDocument, options);
        }
export type MyOrdersQueryHookResult = ReturnType<typeof useMyOrdersQuery>;
export type MyOrdersLazyQueryHookResult = ReturnType<typeof useMyOrdersLazyQuery>;
export type MyOrdersQueryResult = Apollo.QueryResult<MyOrdersQuery, MyOrdersQueryVariables>;
export const OrderByIdDocument = gql`
    query OrderById($_id: String!) {
  orderById(_id: $_id) {
    ...RegularOrder
  }
}
    ${RegularOrderFragmentDoc}`;

/**
 * __useOrderByIdQuery__
 *
 * To run a query within a React component, call `useOrderByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderByIdQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useOrderByIdQuery(baseOptions: Apollo.QueryHookOptions<OrderByIdQuery, OrderByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderByIdQuery, OrderByIdQueryVariables>(OrderByIdDocument, options);
      }
export function useOrderByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderByIdQuery, OrderByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderByIdQuery, OrderByIdQueryVariables>(OrderByIdDocument, options);
        }
export type OrderByIdQueryHookResult = ReturnType<typeof useOrderByIdQuery>;
export type OrderByIdLazyQueryHookResult = ReturnType<typeof useOrderByIdLazyQuery>;
export type OrderByIdQueryResult = Apollo.QueryResult<OrderByIdQuery, OrderByIdQueryVariables>;
export const ProductsByBrandDocument = gql`
    query ProductsByBrand($brand: String!, $pagination: PaginationInput) {
  productsByBrand(brand: $brand, pagination: $pagination) {
    count
    products {
      ...RegularProduct
    }
  }
}
    ${RegularProductFragmentDoc}`;

/**
 * __useProductsByBrandQuery__
 *
 * To run a query within a React component, call `useProductsByBrandQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsByBrandQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsByBrandQuery({
 *   variables: {
 *      brand: // value for 'brand'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useProductsByBrandQuery(baseOptions: Apollo.QueryHookOptions<ProductsByBrandQuery, ProductsByBrandQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsByBrandQuery, ProductsByBrandQueryVariables>(ProductsByBrandDocument, options);
      }
export function useProductsByBrandLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsByBrandQuery, ProductsByBrandQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsByBrandQuery, ProductsByBrandQueryVariables>(ProductsByBrandDocument, options);
        }
export type ProductsByBrandQueryHookResult = ReturnType<typeof useProductsByBrandQuery>;
export type ProductsByBrandLazyQueryHookResult = ReturnType<typeof useProductsByBrandLazyQuery>;
export type ProductsByBrandQueryResult = Apollo.QueryResult<ProductsByBrandQuery, ProductsByBrandQueryVariables>;
export const ProductsByCategoryDocument = gql`
    query ProductsByCategory($category: String!, $pagination: PaginationInput) {
  productsByCategory(category: $category, pagination: $pagination) {
    count
    products {
      ...RegularProduct
    }
  }
}
    ${RegularProductFragmentDoc}`;

/**
 * __useProductsByCategoryQuery__
 *
 * To run a query within a React component, call `useProductsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsByCategoryQuery({
 *   variables: {
 *      category: // value for 'category'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useProductsByCategoryQuery(baseOptions: Apollo.QueryHookOptions<ProductsByCategoryQuery, ProductsByCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsByCategoryQuery, ProductsByCategoryQueryVariables>(ProductsByCategoryDocument, options);
      }
export function useProductsByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsByCategoryQuery, ProductsByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsByCategoryQuery, ProductsByCategoryQueryVariables>(ProductsByCategoryDocument, options);
        }
export type ProductsByCategoryQueryHookResult = ReturnType<typeof useProductsByCategoryQuery>;
export type ProductsByCategoryLazyQueryHookResult = ReturnType<typeof useProductsByCategoryLazyQuery>;
export type ProductsByCategoryQueryResult = Apollo.QueryResult<ProductsByCategoryQuery, ProductsByCategoryQueryVariables>;
export const ProductByIdDocument = gql`
    query ProductById($_id: String!) {
  productById(_id: $_id) {
    ...RegularProduct
  }
}
    ${RegularProductFragmentDoc}`;

/**
 * __useProductByIdQuery__
 *
 * To run a query within a React component, call `useProductByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductByIdQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useProductByIdQuery(baseOptions: Apollo.QueryHookOptions<ProductByIdQuery, ProductByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductByIdQuery, ProductByIdQueryVariables>(ProductByIdDocument, options);
      }
export function useProductByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductByIdQuery, ProductByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductByIdQuery, ProductByIdQueryVariables>(ProductByIdDocument, options);
        }
export type ProductByIdQueryHookResult = ReturnType<typeof useProductByIdQuery>;
export type ProductByIdLazyQueryHookResult = ReturnType<typeof useProductByIdLazyQuery>;
export type ProductByIdQueryResult = Apollo.QueryResult<ProductByIdQuery, ProductByIdQueryVariables>;
export const ProductsDocument = gql`
    query Products($pagination: PaginationInput) {
  products(pagination: $pagination) {
    count
    products {
      ...RegularProduct
    }
  }
}
    ${RegularProductFragmentDoc}`;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const QueryProductsDocument = gql`
    query QueryProducts($q: String!, $pagination: PaginationInput) {
  queryProducts(q: $q, pagination: $pagination) {
    count
    products {
      ...RegularProduct
    }
  }
}
    ${RegularProductFragmentDoc}`;

/**
 * __useQueryProductsQuery__
 *
 * To run a query within a React component, call `useQueryProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryProductsQuery({
 *   variables: {
 *      q: // value for 'q'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useQueryProductsQuery(baseOptions: Apollo.QueryHookOptions<QueryProductsQuery, QueryProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryProductsQuery, QueryProductsQueryVariables>(QueryProductsDocument, options);
      }
export function useQueryProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryProductsQuery, QueryProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryProductsQuery, QueryProductsQueryVariables>(QueryProductsDocument, options);
        }
export type QueryProductsQueryHookResult = ReturnType<typeof useQueryProductsQuery>;
export type QueryProductsLazyQueryHookResult = ReturnType<typeof useQueryProductsLazyQuery>;
export type QueryProductsQueryResult = Apollo.QueryResult<QueryProductsQuery, QueryProductsQueryVariables>;
export const TopProductsDocument = gql`
    query TopProducts($limit: Int) {
  topProducts(limit: $limit) {
    ...RegularProduct
  }
}
    ${RegularProductFragmentDoc}`;

/**
 * __useTopProductsQuery__
 *
 * To run a query within a React component, call `useTopProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopProductsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useTopProductsQuery(baseOptions?: Apollo.QueryHookOptions<TopProductsQuery, TopProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TopProductsQuery, TopProductsQueryVariables>(TopProductsDocument, options);
      }
export function useTopProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopProductsQuery, TopProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TopProductsQuery, TopProductsQueryVariables>(TopProductsDocument, options);
        }
export type TopProductsQueryHookResult = ReturnType<typeof useTopProductsQuery>;
export type TopProductsLazyQueryHookResult = ReturnType<typeof useTopProductsLazyQuery>;
export type TopProductsQueryResult = Apollo.QueryResult<TopProductsQuery, TopProductsQueryVariables>;