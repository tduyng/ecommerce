import React, { useEffect, useState } from 'react';
import Loader from '../Loader';
import { Product, useLatestProductsQuery } from 'src/generated/graphql';
import { ProductComponent } from '../Product/Product';
import Link from 'next/link';
import { CustomSlider } from '../Generals/CustomSlider';

export const HomeLatestProduct = () => {
  const { data, loading } = useLatestProductsQuery();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(data?.latestProducts as Product[]);
  }, [data, loading]);

  if (loading) return <Loader />;

  return (
    <div className="pt-5">
      <div className="d-flex justify-content-between">
        <h3 className="">New Release</h3>
        <div>
          <Link href="/" passHref>
            <a>
              <small>Read More</small>
            </a>
          </Link>
        </div>
      </div>

      <div className="">
        <CustomSlider>
          {!loading && products?.length > 0
            ? products.map(item => <ProductComponent product={item} key={item._id} />)
            : null}
        </CustomSlider>
      </div>
    </div>
  );
};
