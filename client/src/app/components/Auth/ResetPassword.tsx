import router from 'next/router';
import React, { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { MeDocument, MeQuery, useResetPasswordMutation } from 'src/generated/graphql';

export const ResetPassword = () => {
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [resetPassword] = useResetPasswordMutation();

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const handleChange = (name: string) => (e: any) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = formData;
    console.log(formData);
    if (newPassword !== confirmPassword) {
      setError('Password confirmation must match!');
      setShowAlert(true);
      return;
    }

    try {
      const response = await resetPassword({
        variables: {
          input: { newPassword, token: router.query.token as string },
        },
      });

      if (response?.errors) {
        setError(response?.errors[0].message);
        return;
      } else if (response?.data?.resetPassword?.user) {
        toast.success('Reset password successfully!', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push('/login');
      }
    } catch (error) {
      setError(error.message);
      setShowAlert(true);
    }
  };

  return (
    <Row className="justify-content-md-center mt-5">
      <Col xs={12} md={6} lg={4}>
        <h2>Reset password</h2>
        {error && (
          <Alert
            show={showAlert}
            variant="danger"
            onClick={() => setShowAlert(!showAlert)}
            dismissible
          >
            <small>{error}</small>
          </Alert>
        )}
        <Form onSubmit={handleSubmit} className="mt-4">
          <Form.Group>
            <Form.Control
              type="password"
              id="reset_password_new"
              placeholder="New password"
              autoComplete="newPassword"
              onChange={handleChange('newPassword')}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="password"
              id="reset_password_confirm"
              placeholder="Password confirmation"
              onChange={handleChange('confirmPassword')}
              autoComplete="confirmPassword"
              required
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3 d-block w-100">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};
