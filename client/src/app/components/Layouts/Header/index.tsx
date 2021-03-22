import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { SearchBox } from './SearchBox';
import { useLogoutMutation, useMeQuery, User } from 'src/generated/graphql';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import NextLink from 'next/link';

export const Header = () => {
  const apolloClient = useApolloClient();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const { data, loading } = useMeQuery();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const logoutUser = async () => {
    if (!logoutFetching) {
      await logout();
      await apolloClient.resetStore();
      toast.success('Logout successfully!');
      router.push('/');
    }
  };

  let authGroupButtons = (
    <>
      <NextLink href="/login" passHref>
        <Nav.Link>
          <i className="fas fa-sign-in-alt"></i> Login
        </Nav.Link>
      </NextLink>

      <NextLink href="/register" passHref>
        <Nav.Link>
          <i className="fas fa-user-plus"></i> Register
        </Nav.Link>
      </NextLink>
    </>
  );
  if (!loading && user) {
    authGroupButtons = (
      <>
        <NavDropdown title={user?.fullName} id="username">
          <NextLink href="/profile" passHref>
            <NavDropdown.Item>Profile</NavDropdown.Item>
          </NextLink>
          <NavDropdown.Item onClick={() => logoutUser()}>Logout</NavDropdown.Item>
        </NavDropdown>
      </>
    );
  }

  useEffect(() => {
    if (data?.me) {
      setUser(data?.me?.user as User);
    } else {
      setUser(null);
    }
  }, [data, loading]);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="py-3">
        <Container fluid style={{ maxWidth: '1400px' }}>
          <NextLink href="/" passHref>
            <Navbar.Brand>ZetaShop</Navbar.Brand>
          </NextLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ml-auto">
              <NextLink href="/cart" passHref>
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </NextLink>
              {authGroupButtons}
              {!loading && user && user?.role == 'ADMIN' && (
                <NavDropdown title="Admin" id="adminmenu">
                  <NextLink href="/admin/product/new" passHref>
                    <NavDropdown.Item>Create Product</NavDropdown.Item>
                  </NextLink>
                  <NextLink href="/admin/users" passHref>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </NextLink>
                  <NextLink href="/admin/orders" passHref>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </NextLink>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
