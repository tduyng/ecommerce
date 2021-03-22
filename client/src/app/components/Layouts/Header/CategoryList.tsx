import React, { useEffect, useState } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { CategoryBrands, useCategoryBrandsQuery } from 'src/generated/graphql';
import NextLink from 'next/link';
import Loader from '../../Loader';

interface Props {
  width: number;
}

export const CategoryList: React.FC<Props> = ({ width }) => {
  const { data, loading } = useCategoryBrandsQuery();

  const [categoryBrands, setCategoryBrands] = useState<CategoryBrands[]>([]);

  useEffect(() => {
    if (!loading) {
      setCategoryBrands(data?.categoryBrands);
    }
  }, [data, loading]);

  const largeScreen = (
    <div className="w-100 flex">
      {/* <>
        {!loading &&
          categoryBrands.map((item, index) => {
            <NavDropdown
              title={item.category}
              id="category-menu"
              key={index}
              className="text-uppercase"
            >
              {item.brands.map(brand => {
                <NextLink href={`/category/${item.category}?brand=${brand}`} passHref>
                  <NavDropdown.Item>{brand}</NavDropdown.Item>
                </NextLink>;
              })}
            </NavDropdown>;
          })}
      </> */}

      <NavDropdown title="Laptop" id="category-menu" className="text-uppercase">
        <NextLink href={`/category/`} passHref>
          <NavDropdown.Item>MacBook</NavDropdown.Item>
        </NextLink>
        <NextLink href={`/category/`} passHref>
          <NavDropdown.Item>Dell</NavDropdown.Item>
        </NextLink>
        <NextLink href={`/category/`} passHref>
          <NavDropdown.Item>HP</NavDropdown.Item>
        </NextLink>
      </NavDropdown>
      <NavDropdown title="Smart-phone" id="category-menu" className="text-uppercase">
        <NextLink href={`/category/`} passHref>
          <NavDropdown.Item>Samsung</NavDropdown.Item>
        </NextLink>
        <NextLink href={`/category/`} passHref>
          <NavDropdown.Item>Apple</NavDropdown.Item>
        </NextLink>
      </NavDropdown>
    </div>
  );

  const smallScreen = (
    <NavDropdown
      title="More"
      id="more-menu"
      className="p-0  m-0"
      style={{ background: '#343A40', border: 'none' }}
    >
      <div
        className="pl-2"
        style={{ background: '#343A40', marginTop: '-0.5rem', marginBottom: '-0.5rem' }}
      >
        <NavDropdown title="Laptop" id="category-menu" className="text-uppercase">
          <NextLink href={`/category/`} passHref>
            <NavDropdown.Item>MacBook</NavDropdown.Item>
          </NextLink>
          <NextLink href={`/category/`} passHref>
            <NavDropdown.Item>Dell</NavDropdown.Item>
          </NextLink>
          <NextLink href={`/category/`} passHref>
            <NavDropdown.Item>HP</NavDropdown.Item>
          </NextLink>
        </NavDropdown>
        <NavDropdown title="Smart-phone" id="category-menu" className="text-uppercase">
          <NextLink href={`/category/`} passHref>
            <NavDropdown.Item>Samsung</NavDropdown.Item>
          </NextLink>
          <NextLink href={`/category/`} passHref>
            <NavDropdown.Item>Apple</NavDropdown.Item>
          </NextLink>
        </NavDropdown>
      </div>
    </NavDropdown>
  );

  if (loading) return <Loader />;

  return (
    <>
      {width < 768 ? (
        <Nav className="ml-auto w-100" style={{ background: '#343A40' }}>
          {smallScreen}
        </Nav>
      ) : (
        largeScreen
      )}
    </>
  );
};
