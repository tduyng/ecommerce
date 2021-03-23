import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { CardAtm, ICardItem } from './CardAtm';

export const HomeCareAtm = () => {
  const cardItems: ICardItem[] = [
    {
      id: '1',
      title: 'Shop Pre-Owned',
      description:
        'Save Money On Used, Open Box, and Refurbished Equipment & Electronics',
      textLink: 'Shop Now',
      image: '/images/home/Callout_Image_Used.jpg',
    },
    {
      id: '2',
      title: 'Sell or Trade',
      description: `Exchange Your Gear For Used Items, Cash or Credit Toward Future Purchases.`,
      textLink: 'Get A Quote',
      image: '/images/home/Callout_Image_Sell.jpg',
    },
    {
      id: '3',
      title: 'Adorama Edge Credit Card',
      description: `Enjoy 5% OFF† Every Day or 6- and 12-months Special Financing* on qualifying purchases.`,
      textLink: 'Learn More',
      image: '/images/home/Callout_CreditCard.png',
    },
    {
      id: '4',
      title: 'Creators GearUP',
      description: `Exclusive student discounts on thousands of products in photography, video, audio, & more.`,
      textLink: 'Register Now',
      image: '/images/home/Callout_Students.png',
    },
    {
      id: '5',
      title: 'Adorama Rentals',
      description: `Providing the creative community with cameras, lenses, lighting & grip with two convenient locations in NYC.`,
      textLink: 'Get Started',
      image: '/images/home/Callout_Rentals.png',
    },
    {
      id: '6',
      title: 'Adorama Business',
      description: `Schedule a consultation, browse financing options & purchase gear for your corporate, educational or government institution.`,
      textLink: 'Enter Now',
      image: '/images/home/Callout_Image_ABS.jpg',
    },
    {
      id: '7',
      title: 'Printique',
      description: `Discover a world of options for printing and preserving your photographs.`,
      textLink: 'Visit Printique',
      image: '/images/home/Callout_Printique.png',
    },

    {
      id: '8',
      title: 'VIP360',
      description: `Join now and get Free 2-Day Shipping, 1-Year 'Drops & Spills' Protection, 60-Day Returns, & exclusive member-only perks.`,
      textLink: 'Learn More',
      image: '/images/home/Callout_VIP360.png',
    },
  ];
  return (
    <div>
      <Row>
        {cardItems.map((item, index) => (
          <Col xs={12} sm={6} key={index} className="mt-2">
            <CardAtm cardItem={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
