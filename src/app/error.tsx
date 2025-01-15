'use client';

import * as React from 'react';
// import * as Sentry from "@sentry/nextjs";
import Image from 'next/image';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
  // React.useEffect(() => {
  //   Sentry.captureException(error);
  //   console.error("[uncaught error]", error);
  // }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center text-center">
      <Image
        src="/logo-eperpus-full.svg"
        width={200}
        height={100}
        alt="ePerpus"
      />
      <h2 className="mb-3">Terjadi kesalahan sistem</h2>

      <button onClick={() => reset()} type="button" color="flat">
        Kembali ke beranda
      </button>
    </div>
  );
}
