import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../../../lib/utils';

const skeleton = tv({
  base: 'animate-pulse bg-gray-200 rounded-md',
  variants: {
    variant: {
      text: 'h-4 w-full',
      circular: 'rounded-full',
      rectangular: 'w-full h-full',
    },
  },
  defaultVariants: {
    variant: 'text',
  },
});

export type SkeletonVariants = VariantProps<typeof skeleton>;

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    SkeletonVariants {}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeleton({ variant }), className)}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
