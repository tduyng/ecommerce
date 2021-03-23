import React from 'react';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';
import { MetaTags } from 'src/app/components/Layouts/MetaTags';
import { HomeCarousel } from 'src/app/components/Home/HomeCarousel';
import { HomeLatestProduct } from 'src/app/components/Home/HomeLatestProduct';
import { HomeHotDeal } from 'src/app/components/Home/HomeHotDeal';

export default function Home() {
  return (
    <MainLayout>
      <MetaTags title="Home" />
      <HomeCarousel />

      <HomeHotDeal />
      <HomeLatestProduct />
    </MainLayout>
  );
}
