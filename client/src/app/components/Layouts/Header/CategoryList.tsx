import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useAllCategoriesQuery } from 'src/generated/graphql';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

export const CategoryList = () => {
  const { data, loading } = useAllCategoriesQuery();

  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    setCategories(data?.allCategories);
  }, [data, loading]);

  return (
    <Container fluid style={{ maxWidth: '1400px' }}>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {!loading &&
            categories?.length > 0 &&
            categories.map((item, index) => {
              <NavDropdown title={item} id="category-menu" key={index}>
                <NextLink href="#" passHref>
                  <NavDropdown.Item>Create Product</NavDropdown.Item>
                </NextLink>
                <NextLink href="/admin/users" passHref>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </NextLink>
                <NextLink href="/admin/orders" passHref>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </NextLink>
              </NavDropdown>;
            })}
        </Nav>
      </Navbar.Collapse>
    </Container>
  );
};
