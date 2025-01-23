import * as React from 'react';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="relative flex h-screen w-full flex-col justify-center space-y-4 px-4 text-[#333] md:px-[80px]"
      style={{
        backgroundImage: `url('/register-onboarding.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Image
        src="./logo-blicicil.svg"
        alt="blicicil logo"
        width={120}
        height={41}
      />
      {children}
    </div>
  );
}
