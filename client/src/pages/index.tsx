import Head from 'next/head';
import { MetaTags } from 'src/components/MetaTags';

export default function Home() {
  return (
    <div>
      <MetaTags title='Home' />

      <main>
        <h1>Home</h1>
      </main>
    </div>
  );
}
