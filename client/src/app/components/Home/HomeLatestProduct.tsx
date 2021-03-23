import React, { useEffect, useState } from 'react';
import Loader from '../Loader';
import Slider from 'react-slick';
import { Product, useLatestProductsQuery } from 'src/generated/graphql';
import { ProductComponent } from '../Product/Product';

export const HomeLatestProduct = () => {
  const { data, loading } = useLatestProductsQuery();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(data?.latestProducts as Product[]);
  }, [data, loading]);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 510,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  if (loading) return <Loader />;

  return (
    <div className="pt-5">
      <h2 className="text-center">Latest Product</h2>

      <div className="d-flex">
        <Slider {...settings}>
          {products?.length > 0
            ? products.map(item => {
                return <ProductComponent product={item} key={item._id} />;
              })
            : null}
        </Slider>
      </div>
    </div>
  );
};
