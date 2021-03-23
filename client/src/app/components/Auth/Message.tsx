import React from 'react';
import { Alert } from 'react-bootstrap';

interface Props {
  variant?: 'info' | 'danger' | 'success';
}

export const Message: React.FC<Props> = ({ children, variant = 'info' }) => {
  return <Alert variant={variant}>{children}</Alert>;
};
