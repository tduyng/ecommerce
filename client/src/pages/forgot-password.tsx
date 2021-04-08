import React from 'react';
import { ForgotPassword } from 'src/app/components/Auth/ForgotPassword';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';
import { MetaTags } from 'src/app/components/Layouts/MetaTags';

export default function ForgotPasswordPage() {
  return (
    <MainLayout>
      <MetaTags title="Login" />
      <div className="container-1400">
        <ForgotPassword />
      </div>
    </MainLayout>
  );
}
