import * as React from 'react';
import { cn } from '../utils/cn';

function Skeleton({ className }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'mb-2 h-4 w-full animate-pulse rounded bg-gray-300',
        className,
      )}
    />
  );
}

export { Skeleton };
