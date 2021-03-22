import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';

export const SearchBox = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/query?q=${keyword}`);
    } else {
      router.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-1 mb-sm-2"
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-success"
        className="px-3"
        style={{ marginTop: '-0.4rem', paddingTop: '0.4rem', paddingBottom: '0.4rem' }}
      >
        Search
      </Button>
    </Form>
  );
};
