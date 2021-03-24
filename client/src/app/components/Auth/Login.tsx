import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import {
  LoginUserInput,
  MeDocument,
  MeQuery,
  useLoginMutation,
} from 'src/generated/graphql';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUserAuth } from 'src/app/hooks/useUserAuth';

export const Login = () => {
  const [user] = useUserAuth();
  const [login] = useLoginMutation();
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
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
        toast.success('Logged in successfully', {
          position: 'bottom-left',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push(redirect);
      }
    } catch (error) {
      setShowAlert(true);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (typeof router.query.redirect === 'string') {
      setRedirect(router.query.redirect);
    } else {
      setRedirect('/');
    }
  }, [redirect, setRedirect]);

  if (user) router.push(redirect);
  return (
    <Row className="justify-content-md-center mt-5">
      <Col xs={12} md={6} lg={4}>
        <h2>Login</h2>
        {error && (
          <Alert
            show={showAlert}
            variant="danger"
            onClick={() => setShowAlert(!showAlert)}
            dismissible
          >
            {error}
          </Alert>
        )}
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
            <small>New customer? </small>
            <Link
              href={redirect ? `/register?redirect=${redirect}` : '/register'}
              passHref
            >
              <a>
                <small>Register</small>
              </a>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
