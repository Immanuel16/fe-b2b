'use client';
import React from 'react';
import { useSpinner } from '../context/spinner';
import { Spinner } from 'flowbite-react';

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isSpinnerActive } = useSpinner();
  return (
    <>
      {isSpinnerActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          {/* Backdrop dengan warna semi-transparan */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            {/* Spinner di tengah */}
            <Spinner size="xl" color="info" />
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default MainLayout;
