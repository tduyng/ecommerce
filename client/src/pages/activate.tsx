import { useRouter } from 'next/router';
import React from 'react';
import { Register } from 'src/app/components/Auth/Register';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';
import { MetaTags } from 'src/app/components/Layouts/MetaTags';
import toast from 'react-hot-toast';

export default function ActivatePage() {
  const router = useRouter();

  return (
    <MainLayout>
      <MetaTags title="Activate" />
      <div className="container-1400">
        <Register />
      </div>
    </MainLayout>
  );
}
