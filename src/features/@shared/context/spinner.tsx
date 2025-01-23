'use client';

import { createContext, PropsWithChildren, useContext, useState } from 'react';

type TSpinnerContext = {
  isSpinnerActive: boolean;
  setActiveSpinner: (value: boolean) => void;
};

const SpinnerContext = createContext<TSpinnerContext | null>(null);

const useSpinner = () => {
  const context = useContext(SpinnerContext);
  if (!context) throw new Error('Spinner context is null');
  const { isSpinnerActive, setActiveSpinner } = context;
  return { isSpinnerActive, setActiveSpinner };
};

function SpinnerProvider({ children }: PropsWithChildren) {
  const [isSpinnerActive, setActiveSpinner] = useState(false);
  return (
    <SpinnerContext.Provider value={{ isSpinnerActive, setActiveSpinner }}>
      {children}
    </SpinnerContext.Provider>
  );
}

export { useSpinner, SpinnerProvider };
