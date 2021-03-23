import React, { useState } from 'react';

export const useShowDropdown = (value: boolean) => {
  const [isOpen, updateIsOpen] = useState(false);

  const toggle = React.useCallback(() => updateIsOpen(!value), [updateIsOpen]);
  return [isOpen, toggle, updateIsOpen] as const;
};
