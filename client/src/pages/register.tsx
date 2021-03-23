import React from 'react';
import { Register } from 'src/app/components/Auth/Register';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';
import { MetaTags } from 'src/app/components/Layouts/MetaTags';

export default function LoginPage() {
  return (
    <MainLayout>
      <MetaTags title="Register" />
      <div className="container-1400">
        <Register />
      </div>
    </MainLayout>
  );
}
