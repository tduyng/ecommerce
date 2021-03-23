import Link from 'next/link';
import React from 'react';
import { Card } from 'react-bootstrap';

export interface ICardItem {
  id?: string;
  title: string;
  description: string;
  textLink: string;
  image: string;
}
interface Props {
  cardItem: ICardItem;
}

export const CardAtm: React.FC<Props> = ({ cardItem }) => {
  return (
    <Card
      className="bg-transparent text-white font-bold text-left"
      style={{ cursor: 'pointer' }}
    >
      <Link href="/" passHref>
        <Card.Img src={cardItem.image} alt="Card image" />
      </Link>
      <Link href="/" passHref>
        <Card.ImgOverlay className="mt-4">
          <Card.Title>{cardItem.title}</Card.Title>
          <Card.Text className="w-75">{cardItem.description}</Card.Text>

          <Card.Text>
            <Link href="/" passHref>
              <a className="text-white">{cardItem.textLink}</a>
            </Link>
          </Card.Text>
        </Card.ImgOverlay>
      </Link>
    </Card>
  );
};
