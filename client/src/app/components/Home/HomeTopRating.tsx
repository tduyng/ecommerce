import React, { useEffect, useState } from 'react';
import Loader from '../Loader';
import Slider from 'react-slick';
import { Product, useTopProductsQuery } from 'src/generated/graphql';
import { ProductComponent } from '../Product/Product';
import Link from 'next/link';

export const HomeTopRating = () => {
  const { data, loading } = useTopProductsQuery();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(data?.topProducts as Product[]);
  }, [data, loading]);

  interface ArrowProps {
    onClick?: () => void;
  }
  const NextArrow: React.FC<ArrowProps> = props => {
    const { onClick } = props;
    return (
      <div className={'icon-related next'} onClick={onClick}>
        <i className="fas fa-arrow-circle-right"></i>
      </div>
    );
  };

  const PrevArrow: React.FC<ArrowProps> = props => {
    const { onClick } = props;
    return (
      <div className={'icon-related prev'} onClick={onClick}>
        <i className="fas fa-arrow-circle-left"></i>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 510,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
      <div className="d-flex justify-content-between">
        <h3 className="">Top Rating</h3>
        <div>
          <Link href="/" passHref>
            <a>
              <small>Read More</small>
            </a>
          </Link>
        </div>
      </div>

      <div className="">
        <Slider {...settings} className="">
          {!loading && products?.length > 0
            ? products.map(item => <ProductComponent product={item} key={item._id} />)
            : null}
        </Slider>
      </div>
    </div>
  );
};
