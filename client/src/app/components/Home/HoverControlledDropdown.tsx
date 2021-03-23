import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

export default function HoverControlledDropdown(props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Dropdown
      {...props}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onToggle={() => setIsClicked(!isClicked)}
      show={isClicked || isHovered}
    />
  );
}
