import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Product, useProductsQuery } from 'src/generated/graphql';

export const useProducts = () => {
  const router = useRouter();
  const limit: number = parseInt(router.query.limit as string) || 25;
  const { data, loading } = useProductsQuery({ variables: { pagination: { limit } } });
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (loading) return;
    if (data?.products?.products) {
      setProducts(data?.products.products as Product[]);
    } else {
      setProducts([]);
    }
  }, [data, loading]);
  return [products, setProducts] as const;
};
