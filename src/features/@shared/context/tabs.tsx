'use client';
import * as React from 'react';

type TabContext = {
  tabs: number;
  setTabs: (value: number) => void;
};
const TabContext = React.createContext<TabContext | null>(null);

const useTabs = () => {
  const context = React.useContext(TabContext);
  if (!context) throw new Error('Title header context is null');
  const { tabs, setTabs } = context;
  return { tabs, setTabs };
};

function TabsProvider({ children }: React.PropsWithChildren) {
  const [tabs, setTabs] = React.useState(1);
  return (
    <TabContext.Provider value={{ tabs, setTabs }}>
      {children}
    </TabContext.Provider>
  );
}

export { useTabs, TabsProvider };
