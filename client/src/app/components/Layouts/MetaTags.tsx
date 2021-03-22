import Head from 'next/head';

export function MetaTags({
  title = 'Ecommerce GraphQL',
  description = 'Build a GraphQL project E-commerce en full TypeScript with NestJS + NextJS',
  keywords = 'nodejs, nestjs, typescript, graphql, nextjs, ecommerce',
}) {
  return (
    <Head>
      <title>{title === 'Ecommerce GraphQL' ? title : `${title} | Zeta`}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@tienduy_nguyen" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
  );
}
