import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@lib/utils';

const divider = tv({
  base: 'border-none bg-gray-200',
  variants: {
    orientation: {
      horizontal: 'w-full h-px',
      vertical: 'w-px h-auto',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export type DividerVariants = VariantProps<typeof divider>;

export interface DividerProps
  extends React.HTMLAttributes<HTMLHRElement>,
    DividerVariants {}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, orientation, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        className={cn(divider({ orientation }), className)}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';
