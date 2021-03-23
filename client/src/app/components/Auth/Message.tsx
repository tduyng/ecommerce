import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

interface Props {
  variant?: 'info' | 'danger' | 'success';
  isShow?: boolean;
}

export const Message: React.FC<Props> = ({
  children,
  isShow = false,
  variant = 'info',
}) => {
  const [show, setShow] = useState(isShow);
  return (
    <Alert show={show} variant={variant} onClick={() => setShow(!isShow)} dismissible>
      {children}
    </Alert>
  );
};
