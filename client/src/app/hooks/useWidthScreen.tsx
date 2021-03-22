import React, { useEffect, useState } from 'react';

export const useWidthScreen = () => {
  const [width, setWidth] = useState(1000);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    console.log(width);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return [width, setWidth];
};
