import Link from 'next/link';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';

export default function Custom404() {
  return (
    <MainLayout>
      <div className="text-center mt-4">
        <h1>404 - That page does not seem to exist...</h1>
        <div>
          <iframe
            src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
            width="480"
            height="362"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        <Link href="/">
          <button className="btn btn-primary mt-4">Go home</button>
        </Link>
      </div>
    </MainLayout>
  );
}
