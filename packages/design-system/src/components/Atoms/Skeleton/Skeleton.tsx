import * as React from 'react';
import { cva, type RecipeVariantProps } from '@styled-system/css';
import { styled } from '@styled-system/jsx';

const skeletonRecipe = cva({
  base: {
    bg: 'bg.muted',
    borderRadius: 'md',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
  variants: {
    variant: {
      text: {
        height: '4',
        width: '100%',
      },
      circular: {
        borderRadius: 'full',
      },
      rectangular: {
        width: '100%',
        height: '100%',
      },
    },
  },
  defaultVariants: {
    variant: 'text',
  },
});

export type SkeletonVariants = RecipeVariantProps<typeof skeletonRecipe>;

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    SkeletonVariants {}

const StyledSkeleton = styled('div', skeletonRecipe);

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant, ...props }, ref) => {
    return <StyledSkeleton ref={ref} variant={variant} {...props} />;
  }
);

Skeleton.displayName = 'Skeleton';
