'use client';
import Link from 'next/link';
import { useMenu } from '../context/menu';
import styled from 'styled-components';
import Image from 'next/image';
import { HomeIcon, Icons } from './icon';
import { usePathname } from 'next/navigation';
import { routes } from '../constants/menu';
import * as React from 'react';

interface SDrawerProps {
  isOpen: boolean;
}

const Backdrop = styled.div`
  height: 100%;
  width: 100%;
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.3s ease;

  background-color: rgba(34, 41, 47, 0.5);
`;

const SDrawer = styled.div<SDrawerProps>`
  z-index: 300;
  position: fixed;
  ${'' /* top: 0; */}
  left: -24px;
  height: 100%;
  width: 300px;
  background-color: #f9fafc;
  transition: 0.3s ease;
  display: ${(props) => (props.isOpen ? 'none' : 'block')};
  ${'' /* overflow: scroll; */}// transform: translateX(${(props) =>
    props.isOpen ? '0' : '-100%'});
`;

type DrawerProps = {
  isOpen: boolean;
  toggleDrawer: () => void;
  location: string;
};

const Drawer = ({ isOpen, toggleDrawer, location }: DrawerProps) => {
  const { routeList, setRouteList } = useMenu();

  const toggleSubMenu = (parentMenu: string) => {
    setRouteList(
      routeList.map((route) => {
        route.collapsed = route.name === parentMenu ? !route.collapsed : false;
        return route;
      }),
    );
  };

  return (
    <>
      {isOpen && <Backdrop onClick={toggleDrawer} />}
      {isOpen && (
        <SDrawer
          isOpen={isOpen}
          className="flex min-h-screen flex-col space-y-7 px-4 py-6 text-base text-b2b-gray-1"
        >
          <div className="flex items-center justify-between">
            <Image
              src="./logo-b2b.svg"
              width={179.4}
              height={33.4}
              alt="logo b2b"
            />
            <button onClick={toggleDrawer} type="button">
              <p className="text-base font-semibold">X</p>
            </button>
          </div>
          <div className="flex flex-col space-y-2 overflow-y-auto">
            <Link
              href="/"
              className={`flex items-center space-x-3 rounded-md p-3 text-left text-b2b-gray-1 ${
                location === '/' ? 'bg-b2b-primary text-white' : ''
              }`}
            >
              <HomeIcon />
              <span>Home</span>
            </Link>
            {routeList.map((route, idx) => {
              const Icon = route.icon;
              if (route.child.length !== 0) {
                return (
                  <div key={`nav-${route}`}>
                    <button
                      className={`flex w-full items-center justify-between rounded-xl p-3 text-left text-b2b-gray-1 ${
                        route.collapsed
                          ? 'text-b2b-primary'
                          : location.includes(route.name.toLowerCase())
                            ? 'bg-b2b-tertier text-b2b-primary'
                            : ''
                      }`}
                      type="button"
                    >
                      {route.name}
                    </button>
                    <div
                      className={`ml-6 mt-2 space-y-2 ${
                        route.collapsed
                          ? 'flex animate-fadeIn flex-col'
                          : 'hidden'
                      }`}
                    >
                      {route.child.map((child) => (
                        <Link
                          className={`rounded-md p-3 text-left text-b2b-gray-1 ${
                            location.includes(child.link)
                              ? 'bg-b2b-tertier text-b2b-primary'
                              : ''
                          }`}
                          href={child.link}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  className={`flex items-center space-x-2 rounded-md p-3 text-left text-b2b-gray-1 ${
                    location.includes(route.link)
                      ? 'bg-b2b-tertier text-b2b-primary'
                      : ''
                  }`}
                  key={route.name}
                  href={route.link}
                >
                  <Icons component={<Icon />} />
                  <span>{route.name}</span>
                </Link>
              );
            })}
          </div>
        </SDrawer>
      )}
    </>
  );
};

const SidebarComponent = ({ location }: { location: string }) => {
  const { routeList, setRouteList } = useMenu();

  const toggleSubMenu = (parentMenu: string) => {
    setRouteList(
      routeList.map((route) => {
        route.collapsed = route.name === parentMenu ? !route.collapsed : false;
        return route;
      }),
    );
  };

  return (
    <aside
      className="sidebar z-[20] hidden flex-col space-y-7 text-base lg:flex"
      style={{
        touchAction: 'none',
        userSelect: 'none',
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
      }}
    >
      <Image src="./logo-b2b.svg" alt="logo b2b" width={179.4} height={33.4} />
      <div className="flex flex-col space-y-2 overflow-y-auto">
        <Link
          href="/"
          className={`flex items-center space-x-3 rounded-md p-3 text-left text-b2b-gray-1 ${
            location === '/' ? 'bg-b2b-primary text-white' : ''
          }`}
        >
          <HomeIcon />
          <span>Homepage</span>
        </Link>
        {routeList.map((route, idx) => {
          const Icon = route.icon;
          if (route.child.length !== 0) {
            return (
              <div key={`nav-${route}`}>
                <button
                  className={`flex w-full items-center justify-between rounded-xl p-3 text-left text-b2b-gray-1 ${
                    route.collapsed
                      ? 'text-b2b-primary'
                      : location.includes(route.name.toLowerCase())
                        ? 'bg-b2b-tertier text-b2b-primary'
                        : ''
                  }`}
                  type="button"
                >
                  {route.name}
                </button>
                <div
                  className={`ml-6 mt-2 space-y-2 ${
                    route.collapsed ? 'flex animate-fadeIn flex-col' : 'hidden'
                  }`}
                >
                  {route.child.map((child) => (
                    <Link
                      className={`rounded-md p-3 text-left text-b2b-gray-1 ${
                        location.includes(child.link)
                          ? 'bg-b2b-tertier text-b2b-primary'
                          : ''
                      }`}
                      href={child.link}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }
          return (
            <Link
              className={`flex items-center space-x-2 rounded-md p-3 text-left text-b2b-gray-1 ${
                location.includes(route.link)
                  ? 'bg-b2b-tertier text-b2b-primary'
                  : ''
              }`}
              key={route.name}
              href={route.link}
            >
              <Icons component={<Icon />} />
              <span>{route.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

const Sidebar = () => {
  const { isMenuOpen, setIsMenuOpen } = useMenu();
  const location = usePathname();
  const handleDrawerResponsive = () => {
    const hideMenu = window.innerWidth >= 1024;
    if (hideMenu) {
      setIsMenuOpen(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    routes.map((route) => {
      if (route.child.length !== 0) {
        route.collapsed = false;
      }
    });
    handleDrawerResponsive();
    window.addEventListener('resize', handleDrawerResponsive);

    return () => window.removeEventListener('resize', handleDrawerResponsive);
  }, [routes]);

  return (
    <>
      <Drawer
        isOpen={isMenuOpen}
        toggleDrawer={() => setIsMenuOpen(!isMenuOpen)}
        location={location}
      />
      <SidebarComponent location={location} />
    </>
  );
};

export { Sidebar };
