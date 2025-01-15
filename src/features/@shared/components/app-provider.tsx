'use client';

import * as React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/features/@shared/utils/query-helper';
import { setDefaultOptions } from 'date-fns';
import { id } from 'date-fns/locale';

function AppProvider({ children }: React.PropsWithChildren) {
  setDefaultOptions({ locale: id });
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export { AppProvider };
