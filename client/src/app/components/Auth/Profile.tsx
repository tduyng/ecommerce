import Link from 'next/link';
import { useRouter } from 'next/router';
import { userInfo } from 'os';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Form,
  Modal,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useMyOrders } from 'src/app/hooks/useMyOrders';
import { useUserAuth } from 'src/app/hooks/useUserAuth';
import {
  MeDocument,
  MeQuery,
  useChangePasswordMutation,
  useUpdateProfileMutation,
} from 'src/generated/graphql';
import Loader from '../Loader';

interface IFormData {
  fullName: string;
  username: string;
  email: string;
}
interface IFormPassword {
  oldPassword: string;
  newPassword: string;
}

export const Profile = () => {
  const [alert, setAlert] = useState({ variant: 'danger', message: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [user] = useUserAuth();
  const [loading, setLoading] = useState(true);
  const [updateProfile] = useUpdateProfileMutation();
  const [changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const [formData, setFormData] = useState<IFormData>({
    fullName: user?.fullName || '',
    username: user?.username || '',
    email: user?.email || '',
  });
  const [formPassword, setFormPassword] = useState<IFormPassword>({
    oldPassword: '',
    newPassword: '',
  });
  const [orders] = useMyOrders();
  const [showPasswordForm, setShowPasswordFrom] = useState(false);

  const handleChange = (name: string) => (e: any) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleChangePassword = (name: string) => (e: any) => {
    setFormPassword({ ...formPassword, [name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await updateProfile({
        variables: { input: formData },
        update: (cache, { data }) => {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: 'Query',
              me: { user: data?.updateProfile?.user },
            },
          });
        },
      });
      if (response?.data?.updateProfile?.user) {
        toast.success('Update profile successfully!', {
          position: 'bottom-left',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      console.log(response);
    } catch (error) {
      setAlert({ variant: 'error', message: error.message });
    }
  };

  const submitChangePassword = async (e: any) => {
    e.preventDefault();
    const callChangePassword = async () => {
      try {
        const response = await changePassword({
          variables: { input: formPassword },
        });
        console.log(response);
        if (response?.data?.changePassword?.user) {
          toast.success('Update profile successfully!', {
            position: 'bottom-left',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          router.push('/');
        } else {
          setAlert({
            variant: 'error',
            message: response?.data?.changePassword?.error?.message,
          });
        }
      } catch (error) {
        setAlert({ variant: 'error', message: error.message });
      }
    };
    callChangePassword();
  };

  const refreshForm = () => {
    setFormData({
      fullName: user?.fullName || '',
      username: user?.username || '',
      email: user?.email || '',
    });
  };

  useEffect(() => {
    setLoading(false);
    refreshForm();
  }, [loading]);

  if (loading) return <Loader />;

  return (
    <Row>
      <Col md={3}>
        <div className="d-flex justify-content-between">
          <h2>User Profile</h2>
          <div onClick={refreshForm}>
            <OverlayTrigger
              overlay={<Tooltip id="tooltip-disabled">Refresh form</Tooltip>}
            >
              <i className="fas fa-sync-alt mt-2 mr-1"></i>
            </OverlayTrigger>
          </div>
        </div>
        {alert.message && (
          <Alert
            show={showAlert}
            variant={alert.variant}
            onClick={() => setShowAlert(!showAlert)}
            dismissible
          >
            {alert.message}
          </Alert>
        )}
        <Modal show={showPasswordForm} onHide={() => setShowPasswordFrom(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Change password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submitChangePassword}>
              {alert.message && (
                <Alert
                  show={showAlert}
                  variant={alert.variant}
                  onClick={() => setShowAlert(!showAlert)}
                  dismissible
                >
                  {alert.message}
                </Alert>
              )}
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Current password"
                  id="old_password"
                  onChange={handleChangePassword('oldPassword')}
                  value={formPassword.oldPassword}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="New password"
                  id="new_password"
                  onChange={handleChangePassword('newPassword')}
                  autoComplete="password"
                  value={formData?.username || ''}
                ></Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowPasswordFrom(false)}>
              Update password
            </Button>
          </Modal.Footer>
        </Modal>

        <Form onSubmit={handleSubmit} className="text-left">
          <Form.Group>
            <div className="d-flex justify-content-between mt-4">
              <Form.Label>Full Name</Form.Label>
              <div onClick={() => setShowPasswordFrom(!showPasswordForm)}>
                <OverlayTrigger
                  overlay={<Tooltip id="tooltip-disabled">Change password</Tooltip>}
                >
                  <i className="fas fa-cogs mr-1"></i>
                </OverlayTrigger>
              </div>
            </div>
            <Form.Control
              type="text"
              placeholder="Full Name"
              id="profile_fullName"
              onChange={handleChange('fullName')}
              value={formData?.fullName || ''}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              id="profile_username"
              onChange={handleChange('username')}
              value={formData?.username || ''}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              id="profile_email"
              onChange={handleChange('email')}
              value={formData?.email || ''}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
        {alert.message && (
          <Alert
            show={showAlert}
            variant="danger"
            onClick={() => setShowAlert(!showAlert)}
            dismissible
          >
            {alert.message}
          </Alert>
        )}
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Link href={`/order/${order._id}`} passHref>
                    <a className="btn-sm btn-primary">Details</a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};
