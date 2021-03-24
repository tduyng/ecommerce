import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { RegisterUserInput, useRegisterMutation } from 'src/generated/graphql';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';

export const Register = () => {
  const [register] = useRegisterMutation();
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const [redirect, setRedirect] = useState('');

  const [formData, setFormData] = useState<RegisterUserInput>({
    username: '',
    email: '',
    password: '',
  });
  const handleChange = (name: string) => (e: any) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await register({
        variables: {
          input: formData,
        },
      });
      console.log(response);
      if (response?.errors) {
        setError(response?.errors[0].message);
        return;
      } else if (response?.data?.register?.token) {
        toast.info(
          'We just send you an email of confirmation. Check it to activate you account',
          {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          },
        );
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
        <h2>Register</h2>
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
          <Form.Control
            className="mt-4"
            type="text"
            id="register_username"
            placeholder="Username"
            onChange={handleChange('username')}
            required
          ></Form.Control>

          <Form.Control
            className="mt-4"
            type="email"
            id="register_email"
            placeholder="Email"
            onChange={handleChange('email')}
            required
          ></Form.Control>

          <Form.Control
            className="mt-4"
            type="password"
            id="register_password"
            placeholder="Password"
            onChange={handleChange('password')}
            required
            autoComplete="password"
          ></Form.Control>
          <div className="mt-3 mr-1 text-right ml-auto">
            <small>Already have an account? </small>
            <Link href={redirect ? `/login?redirect=${redirect}` : '/login'} passHref>
              <a>
                <small>Login</small>
              </a>
            </Link>
          </div>

          <Button type="submit" variant="primary" className="mt-4 d-block w-100">
            Register
          </Button>
        </Form>
      </Col>
    </Row>
  );
};
