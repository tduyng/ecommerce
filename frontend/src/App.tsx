import React , {Fragment}from 'react';
import './App.css';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import { Container } from 'react-bootstrap';

export const App = ()  => {
  return (
    <div>
         <Header></Header>
        <main className="py-3">
          <Container>
            <h1>Welcome to MERN Shop</h1>
          </Container>
        </main>

         <Footer></Footer>
    </div>
  );
}
