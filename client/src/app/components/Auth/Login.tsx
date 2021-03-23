import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import {
  LoginUserInput,
  MeDocument,
  MeQuery,
  useLoginMutation,
} from 'src/generated/graphql';
import { Message } from './Message';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const Login = () => {
  const [login] = useLoginMutation();
  const [error, setError] = useState('');
  const router = useRouter();
  const [redirect, setRedirect] = useState('');

  const [formData, setFormData] = useState<LoginUserInput>({
    usernameOrEmail: '',
    password: '',
  });
  const handleChange = (name: string) => (e: any) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await login({
        variables: {
          input: formData,
        },
        update: (cache, { data }) => {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: 'Query',
              me: { user: data?.login.user },
            },
          });
          cache.evict({ fieldName: 'products:{}' });
        },
      });
      console.log(response);
      if (response?.errors) {
        setError(response?.errors[0].message);
        return;
      } else if (response?.data?.login?.user) {
        toast.success('Logged in successfully');
        if (typeof router.query.redirect === 'string') {
          router.push(router.query.redirect);
        } else {
          router.push('/');
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (typeof router.query.redirect === 'string') {
      setRedirect(router.query.redirect);
    } else {
      setRedirect('');
    }
  }, [redirect, setRedirect]);
  return (
    <Row className="justify-content-md-center mt-5">
      <Col xs={12} md={6} lg={4}>
        <h2>Login</h2>
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              id="login_username"
              placeholder="Username or Email"
              onChange={handleChange('usernameOrEmail')}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="password"
              id="login_password"
              placeholder="Enter password"
              onChange={handleChange('password')}
              required
              autoComplete="password"
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Login
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New Customer?{' '}
            <Link href={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Register
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
