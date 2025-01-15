import {
  Spinner,
  type ButtonProps as FBButtonProps,
} from '@/features/@shared/utils/flowbite';
import * as React from 'react';
import { cn } from '../utils/cn';

type ButtonProps = FBButtonProps & {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary-orange' | 'secondary-orange';
  type?: 'button' | 'submit';
  isProcessing?: boolean;
  className?: string;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size,
      color,
      type = 'button',
      children,
      className,
      fullSized,
      isProcessing,
      ...props
    },
    ref,
  ) => (
    <button
      {...props}
      type={type}
      ref={ref}
      className={cn(
        `flex items-center justify-center px-m py-sm text-center text-base outline-none ${className}`,
        {
          'rounded-m bg-[#f7b392]/25 text-[#f06726] focus:ring-[#f06726]':
            color === 'primary-orange',
        },
        {
          'w-full': fullSized,
        },
        {
          'rounded-m border-[1.5px] border-b2b-primary bg-[#fff]/60 text-[#f06726] focus:ring-[#f06726]':
            color === 'secondary-orange',
        },
        {
          'px-3 py-1.5': size === 'sm',
        },
        {
          'p-6 text-xl': size === 'lg',
        },
      )}
    >
      {/* {isProcessing && (
        <Spinner className="absolute left-[120px] bottom-3" color="warning" />
      )} */}
      {isProcessing && <Spinner color="warning" />}
      <span>{children}</span>
    </button>
  ),
);

export { Button };
