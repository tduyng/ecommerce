import React from 'react';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';
import { MetaTags } from 'src/app/components/Layouts/MetaTags';
import { HomeCarousel } from 'src/app/components/Home/HomeCarousel';
import { HomeLatestProduct } from 'src/app/components/Home/HomeLatestProduct';
import { HomeHotDeal } from 'src/app/components/Home/HomeHotDeal';
import { HomeTopCategories } from 'src/app/components/Home/HomeTopCategories';
import { HomeTopRating } from 'src/app/components/Home/HomeTopRating';
import { HomeCinematic } from 'src/app/components/Home/HomeCinematic';
import { HomeCareAtm } from 'src/app/components/Home/HomeCardAtm';
import { HomeContact } from 'src/app/components/Home/HomeContact';

export default function Home() {
  return (
    <MainLayout>
      <MetaTags title="Home" />
      <div className="container-1400">
        <HomeCarousel />
        <HomeHotDeal />
      </div>

      <div className="bg-gray pb-5">
        <div className="container-1400">
          <HomeTopCategories />
          <HomeCinematic />
          <HomeTopRating />
          <HomeLatestProduct />
          <HomeCareAtm />
        </div>
      </div>
      <div className="container-1400">
        <HomeContact />
      </div>
    </MainLayout>
  );
}
