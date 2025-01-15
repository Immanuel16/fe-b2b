import * as React from 'react';
import { type TextInputProps as FBTextInputProps } from '../utils/flowbite';
import { useInputGroup } from './input-group';
import { cn } from '../utils/cn';

// type InputProps = Omit<React.PropsWithRef<'input'>, 'ref' | 'color'> & {
//   v addon?: React.ReactNode;
//   v color?: keyof FlowbiteTextInputColors;
//   v helperText?: React.ReactNode;
//   icon?: FC<ComponentProps<'svg'>>;
//   rightIcon?: FC<ComponentProps<'svg'>>;
//   shadow?: boolean;
//   sizing?: keyof FlowbiteTextInputSizes;
//   theme?: DeepPartial<FlowbiteTextInputTheme>;
// }

type TextInputProps = FBTextInputProps & {
  rightAddon?: React.ReactNode;
  isError?: boolean;
};

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id,
      disabled,
      addon,
      rightAddon,
      color,
      helperText,
      icon,
      isError,
      className,
      ...props
    },
    ref,
  ) => {
    const context = useInputGroup();

    return (
      <div className={cn({ 'opacity-50': disabled || context?.disabled })}>
        <div
          className={cn(
            `flex items-center overflow-hidden rounded-m border border-gray-200 bg-white px-1 py-[7px] focus-within:border-b2b-primary focus-within:ring-1 focus-within:ring-b2b-primary`,
            {
              'border-red-500 bg-red-50 text-red-900 focus-within:border-red-500 focus-within:ring-red-500':
                color === 'failure',
            },
            {
              'border-yellow-500 bg-yellow-50 text-yellow-900 focus-within:border-yellow-500 focus-within:ring-yellow-500':
                color === 'warning',
            },
            {
              'border-green-500 bg-green-50 text-green-900 focus-within:border-green-500 focus-within:ring-green-500':
                color === 'success',
            },
          )}
        >
          {!!addon && (
            <span className="flex items-center p-2.5 pr-0 text-sm">
              {addon}
            </span>
          )}

          <input
            className={cn(
              'w-full border-0 bg-transparent p-2.5 text-sm outline-none',
              { 'placeholder-red-700': color === 'failure' },
              { 'placeholder-yellow-700': color === 'warning' },
              { 'placeholder-green-700': color === 'success' },
              { 'cursor-not-allowed': disabled || context?.disabled },
              className,
            )}
            id={id ?? context?.id}
            ref={ref}
            disabled={disabled ?? context?.disabled}
            {...props}
          />

          {!!rightAddon && (
            <span className="flex items-center p-2.5 pl-0 text-sm">
              {rightAddon}
            </span>
          )}
        </div>

        {helperText && (
          <p
            className={cn(
              'mt-2 text-sm',
              { 'text-red-600': color === 'failure' },
              { 'text-yellow-500': color === 'warning' },
              { 'text-green-600': color === 'success' },
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

export { TextInput };
