import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { CartImageRounded } from './CartImageRouded';

export const HomeTopCategories = () => {
  const categories = [
    {
      category: 'Photography',
      image: '/images/home/home-cat-dslr.jpg',
    },
    {
      category: 'Pro Video',
      image: '/images/home/home-cat-provideo.jpg',
    },
    {
      category: 'Computers',
      image: '/images/home/home-cat-computers.jpg',
    },
    {
      category: 'Gaming',
      image: '/images/home/home-cat-gaming.jpg',
    },
    {
      category: 'Drone & Accessories',
      image: '/images/home/home-cat-drones.jpg',
    },
    {
      category: 'Audio',
      image: '/images/home/home-cat-audio.jpg',
    },
    {
      category: 'Lighting & Studio',
      image: '/images/home/home-cat-lighting.jpg',
    },
    {
      category: 'SmartHome',
      image: '/images/home/home-cat-smartHome.jpg',
    },
    {
      category: 'Home Office',
      image: '/images/home/home-cat-homeOffice.jpg',
    },
    {
      category: 'Home Theater',
      image: '/images/home/home-cat-theater.jpg',
    },
    {
      category: 'Wireless',
      image: '/images/home/home-cat-wireless.jpg',
    },
    {
      category: 'Musical Instruments',
      image: '/images/home/home-cat-music.jpg',
    },
  ];
  return (
    <div className=" pt-4 mt-4 text-center">
      <h2 className="text-center">Top Categories</h2>

      <div className="top-categories pt-5 mx-auto">
        {categories.map((item, index) => {
          return (
            <div key={index} className="home-cat-item mx-auto">
              <CartImageRounded category={item.category} image={item.image} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
