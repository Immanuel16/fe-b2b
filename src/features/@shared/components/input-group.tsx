'use client';

import { cn } from '../utils/cn';
import { Label, Tooltip } from '../utils/flowbite';
import * as React from 'react';

type InputGroupProps = React.ComponentPropsWithoutRef<'div'> & {
  label?: string;
  id: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  tooltip?: string;
};

type InputGroupContextValue = Pick<
  InputGroupProps,
  'id' | 'disabled' | 'label'
>;

const InputGroupContext = React.createContext<null | InputGroupContextValue>(
  null,
);

function useInputGroup() {
  return React.useContext(InputGroupContext);
}

function InputGroup({
  label,
  id,
  disabled,
  size,
  tooltip,
  children,
  className,
}: InputGroupProps) {
  return (
    <InputGroupContext.Provider value={{ id, label, disabled }}>
      <div className={cn('mb-3 w-full space-y-3', className)}>
        <div className="mb-1 flex items-center gap-1">
          {label && (
            <label htmlFor={id} className={'text-base font-bold text-gray-600'}>
              {label}
            </label>
          )}

          {tooltip && (
            <Tooltip content={tooltip} placement="right">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Info</title>
                <g clipPath="url(#clip0_869_20649)">
                  <path
                    d="M6 0C4.81331 0 3.65328 0.351894 2.66658 1.01118C1.67989 1.67047 0.910851 2.60754 0.456725 3.7039C0.0025997 4.80025 -0.11622 6.00665 0.115291 7.17054C0.346802 8.33443 0.918247 9.40352 1.75736 10.2426C2.59648 11.0818 3.66557 11.6532 4.82946 11.8847C5.99335 12.1162 7.19975 11.9974 8.2961 11.5433C9.39246 11.0891 10.3295 10.3201 10.9888 9.33342C11.6481 8.34672 12 7.18669 12 6C11.9983 4.40924 11.3656 2.88413 10.2407 1.75929C9.11587 0.634449 7.59076 0.00174696 6 0ZM5.7 2.4C5.87801 2.4 6.05201 2.45278 6.20002 2.55168C6.34802 2.65057 6.46337 2.79113 6.53149 2.95558C6.59961 3.12004 6.61744 3.301 6.58271 3.47558C6.54798 3.65016 6.46227 3.81053 6.3364 3.9364C6.21053 4.06226 6.05017 4.14798 5.87558 4.18271C5.701 4.21743 5.52004 4.19961 5.35559 4.13149C5.19113 4.06337 5.05057 3.94802 4.95168 3.80001C4.85279 3.65201 4.8 3.478 4.8 3.3C4.8 3.0613 4.89482 2.83239 5.06361 2.6636C5.23239 2.49482 5.46131 2.4 5.7 2.4ZM7.2 9H4.8C4.64087 9 4.48826 8.93678 4.37574 8.82426C4.26322 8.71174 4.2 8.55913 4.2 8.4C4.2 8.24087 4.26322 8.08826 4.37574 7.97573C4.48826 7.86321 4.64087 7.8 4.8 7.8H5.4V6H4.8C4.64087 6 4.48826 5.93678 4.37574 5.82426C4.26322 5.71174 4.2 5.55913 4.2 5.4C4.2 5.24087 4.26322 5.08826 4.37574 4.97573C4.48826 4.86321 4.64087 4.8 4.8 4.8H6C6.15913 4.8 6.31174 4.86321 6.42427 4.97573C6.53679 5.08826 6.6 5.24087 6.6 5.4V7.8H7.2C7.35913 7.8 7.51174 7.86321 7.62427 7.97573C7.73679 8.08826 7.8 8.24087 7.8 8.4C7.8 8.55913 7.73679 8.71174 7.62427 8.82426C7.51174 8.93678 7.35913 9 7.2 9Z"
                    fill="#9CA3AF"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_869_20649">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Tooltip>
          )}
        </div>
        {children}
      </div>
    </InputGroupContext.Provider>
  );
}

export {
  InputGroup,
  useInputGroup,
  type InputGroupProps,
  type InputGroupContextValue,
};
