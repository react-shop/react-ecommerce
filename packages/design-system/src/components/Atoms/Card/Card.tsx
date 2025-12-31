import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@lib/utils';

const card = tv({
  base: 'rounded-lg bg-white',
  variants: {
    variant: {
      elevated: 'shadow-md',
      outline: 'border border-gray-200',
      filled: 'bg-gray-50',
    },
    padding: {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    },
  },
  defaultVariants: {
    variant: 'elevated',
    padding: 'md',
  },
});

export type CardVariants = VariantProps<typeof card>;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, CardVariants {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(card({ variant, padding }), className)}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
