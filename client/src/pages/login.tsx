import React from 'react';
import { Login } from 'src/app/components/Auth/Login';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';
import { MetaTags } from 'src/app/components/Layouts/MetaTags';

export default function LoginPage() {
  return (
    <MainLayout>
      <MetaTags title="Login" />
      <div className="container-1400">
        <Login />
      </div>
    </MainLayout>
  );
}
