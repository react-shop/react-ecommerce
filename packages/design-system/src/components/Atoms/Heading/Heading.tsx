import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@lib/utils';

const heading = tv({
  base: 'font-heading font-bold',
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    size: 'xl',
    weight: 'bold',
  },
});

export type HeadingVariants = VariantProps<typeof heading>;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, HeadingVariants {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as: Component = 'h2', size, weight, ...props }, ref) => {
    return (
      <Component
        ref={ref as any}
        className={cn(heading({ size, weight }), className)}
        {...props}
      />
    );
  }
);

Heading.displayName = 'Heading';
