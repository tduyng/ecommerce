import { Container } from 'react-bootstrap';
import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

interface MainLayoutProps {}
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="py-3 px-2" style={{ minHeight: '85vh' }}>
        <Container style={{ maxWidth: '1400px' }}>{children}</Container>
      </main>

      <Footer />
    </>
  );
};
