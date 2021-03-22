import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, InputGroup } from 'react-bootstrap';

export const SearchBox = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/product/search?q=${keyword}`);
    }
  };

  return (
    <Form onSubmit={submitHandler} inline className="mt-sm-2">
      <InputGroup>
        <input
          className="form-control py-2 border-right-0 border"
          type="search"
          name="q"
          placeholder="Search"
          onChange={e => setKeyword(e.target.value)}
          id="example-search-input"
        ></input>
        <span className="input-group-append">
          <button
            className="input-group-text"
            onClick={e => submitHandler(e)}
            type="submit"
          >
            <i className="fa fa-search"></i>
          </button>
        </span>
      </InputGroup>
    </Form>
  );
};
