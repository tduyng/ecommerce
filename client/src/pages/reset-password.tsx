import React from 'react';
import { ResetPassword } from 'src/app/components/Auth/ResetPassword';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';
import { MetaTags } from 'src/app/components/Layouts/MetaTags';

export default function ResetPasswordPage() {
  return (
    <MainLayout>
      <MetaTags title="Login" />
      <div className="container-1400">
        <ResetPassword />
      </div>
    </MainLayout>
  );
}
