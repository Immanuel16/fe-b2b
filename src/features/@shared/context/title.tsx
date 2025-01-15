'use client';
import * as React from 'react';

type TitleHeaderContext = {
  title: string;
  setTitle: (value: string) => void;
};
const TitleHeaderContext = React.createContext<TitleHeaderContext | null>(null);

const useTitle = () => {
  const context = React.useContext(TitleHeaderContext);
  if (!context) throw new Error('Title header context is null');
  const { title, setTitle } = context;
  return { title, setTitle };
};

function TitleHeaderProvider({ children }: React.PropsWithChildren) {
  const [title, setTitle] = React.useState('');
  return (
    <TitleHeaderContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleHeaderContext.Provider>
  );
}

export { useTitle, TitleHeaderProvider };
