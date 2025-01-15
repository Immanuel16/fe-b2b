'use client';
import * as React from 'react';
import { type Routes, routes } from '../constants/menu';

type MenuContext = {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  routeList: Routes[];
  setRouteList: (value: Routes[]) => void;
};

const MenuContext = React.createContext<MenuContext | null>(null);
const useMenu = () => {
  const context = React.useContext(MenuContext);
  if (!context) throw new Error('context is null');
  const { isMenuOpen, setIsMenuOpen, routeList, setRouteList } = context;
  return { isMenuOpen, setIsMenuOpen, routeList, setRouteList };
};

function MenuProvider({ children }: React.PropsWithChildren) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [routeList, setRouteList] = React.useState(routes);
  return (
    <MenuContext.Provider
      value={{ isMenuOpen, setIsMenuOpen, routeList, setRouteList }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export { useMenu, MenuProvider };
