import Link from 'next/link';
import React from 'react';
import { Card } from 'react-bootstrap';
import slugify from 'slugify';
interface Props {
  category: string;
  image: string;
}
export const CartImageRounded: React.FC<Props> = ({ category, image }) => {
  const slug = '/category/' + slugify(category, { lower: true });
  return (
    <Card className="card-img-circle text-center mx-auto">
      <Link href={slug} passHref>
        <Card.Img src={image} className="rounded-circle mx-auto" />
      </Link>

      <Link href={slug} passHref>
        <Card.Body className="pb-0 mb-0">
          <Card.Title as="div">
            <strong>{category}</strong>
          </Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
};
