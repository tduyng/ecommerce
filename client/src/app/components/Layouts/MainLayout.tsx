import { Container } from 'react-bootstrap';
import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

interface MainLayoutProps {}
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="py-3" style={{ minHeight: '85vh' }}>
        <Container fluid>{children}</Container>
      </main>

      <Footer />
    </>
  );
};
