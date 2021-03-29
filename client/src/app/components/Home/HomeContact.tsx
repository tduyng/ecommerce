import Link from 'next/link';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

export const HomeContact = () => {
  return (
    <div className=" mt-4 mb-4">
      <Row>
        <Col xs={12} sm={6} md={4} className="text-center mx-auto pt-4">
          <h3>How Are We Doing?</h3>
          <p>Your opinions and comments are valuable to us</p>
          <Link href="/">
            <a>
              <span>We'd love to get your feedback!</span>
            </a>
          </Link>
          <div className="text-center ml-auto">
            <h3>Connect with Us</h3>
            <div className="d-flex social-class justify-content-center">
              <Link href="/" passHref>
                <i className="fab fa-facebook"></i>
              </Link>
              <Link href="/" passHref>
                <i className="fab fa-twitter"></i>
              </Link>
              <Link href="/" passHref>
                <i className="fab fa-youtube"></i>
              </Link>
              <Link href="/" passHref>
                <i className="fab fa-instagram"></i>
              </Link>
            </div>
          </div>
        </Col>

        <Col xs={12} sm={6} md={4} className="text-center mx-auto pt-4">
          <h3>From 42West</h3>
          <p>
            Bringing you great new articles, posts and fresh content to equip your
            creativity.
          </p>
          <Link href="/">
            <a>
              <span>View more stories...</span>
            </a>
          </Link>
        </Col>

        <Col xs={12} sm={6} md={4} className="text-center mx-auto pt-4">
          <h3>Stay in the Know</h3>
          <p>Get exclusive access to expert tips, special offers and coupons.</p>
          <div>
            <Form>
              <Form.Row className="align-items-center no-gutters">
                <Col xs={12} sm={8}>
                  <Form.Control type="email" placeholder="Enter email"></Form.Control>
                </Col>
                <Col xs={12} sm={4} className="px-0 mr-auto mt-2">
                  <Button variant="primary" type="submit">
                    SignUp
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};
