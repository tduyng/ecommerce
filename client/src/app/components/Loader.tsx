import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: '1.5rem',
        height: '1.5rem',
        margin: 'auto',
        display: 'block',
        position: 'absolute',
        top: '30%',
        left: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loader;
