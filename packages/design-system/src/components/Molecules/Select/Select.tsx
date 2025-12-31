import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@lib/utils';
import { ChevronDown } from 'lucide-react';

const select = tv({
  base: 'w-full rounded-md transition-all focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none',
  variants: {
    variant: {
      outline: 'border border-gray-300 bg-white hover:border-gray-400 focus:border-primary-500 focus:ring-primary-500',
      filled: 'border border-transparent bg-gray-100 hover:bg-gray-200 focus:bg-white focus:border-primary-500 focus:ring-primary-500',
    },
    size: {
      sm: 'px-2 py-1.5 pr-8 text-sm',
      md: 'px-3 py-2 pr-10 text-base',
      lg: 'px-4 py-3 pr-12 text-lg',
    },
    isInvalid: {
      true: 'border-error-500 focus:border-error-500 focus:ring-error-500',
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
});

export type SelectVariants = VariantProps<typeof select>;

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    SelectVariants {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, size, isInvalid, children, ...props }, ref) => {
    return (
      <div className="relative inline-block w-full">
        <select
          ref={ref}
          className={cn(select({ variant, size, isInvalid }), className)}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
          size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20}
        />
      </div>
    );
  }
);

Select.displayName = 'Select';
