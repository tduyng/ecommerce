import { MainLayout } from 'src/app/components/Layouts/MainLayout';
import { MetaTags } from 'src/app/components/Layouts/MetaTags';

export default function Home() {
  return (
    <MainLayout>
      <MetaTags title="Home" />

      <main>
        <h1>Home</h1>
      </main>
    </MainLayout>
  );
}
