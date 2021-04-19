import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';
import { MetaTags } from 'src/app/components/Layouts/MetaTags';
import { useActivateMutation } from 'src/generated/graphql';
import { toast } from 'react-toastify';
import Loader from 'src/app/components/Loader';

export default function ActivatePage() {
  const router = useRouter();
  const [activate] = useActivateMutation();

  useEffect(() => {
    if (!router.isReady) return;
    const activateAccount = async () => {
      const token = router.query.token as string;
      try {
        const response = await activate({ variables: { token } });
        if (response?.data?.activate?.user) {
          toast.success('Activate account successfully!', {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error('Token not valid!', {
            position: 'bottom-left',
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        toast.error(error.message, {
          position: 'bottom-left',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        router.push('/');
      }
    };
    activateAccount();
  }, [router.isReady]);

  if (!router.isReady) return <Loader />;

  return (
    <MainLayout>
      <MetaTags title="Activate" />
      <div className="container-1400 mt-4">
        <span>Activate account</span>
      </div>
    </MainLayout>
  );
}
