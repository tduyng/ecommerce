import React, { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useForgotPasswordMutation } from 'src/generated/graphql';

export const ForgotPassword = () => {
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  const [formData, setFormData] = useState({
    email: '',
  });
  const handleChange = (name: string) => (e: any) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await forgotPassword({
        variables: {
          email: formData.email,
        },
      });

      if (response?.errors) {
        setError(response?.errors[0].message);
        setShowAlert(true);
        return;
      } else if (response?.data?.forgotPassword?.token) {
        toast.info(
          'We just send you and link to reset password. Please check your mail and activate that link!',
          {
            position: 'bottom-left',
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          },
        );
      }
    } catch (error) {
      setError(error.message);
      setShowAlert(true);
    }
  };

  return (
    <Row className="justify-content-md-center mt-5">
      <Col xs={12} md={6} lg={4}>
        <h2>Forgot password</h2>
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
              type="text"
              id="forgot_password_email"
              placeholder="Enter your email"
              onChange={handleChange('email')}
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
