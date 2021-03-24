import React from 'react';
import { Profile } from 'src/app/components/Auth/Profile';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';
import { MetaTags } from 'src/app/components/Layouts/MetaTags';

export default function LoginPage() {
  return (
    <MainLayout>
      <MetaTags title="Profile" />
      <div className="container-1400 mt-4">
        <Profile />
      </div>
    </MainLayout>
  );
}
