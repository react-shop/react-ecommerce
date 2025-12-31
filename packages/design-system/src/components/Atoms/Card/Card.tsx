import * as React from 'react';
import { cva, type RecipeVariantProps } from '@styled-system/css';
import { styled } from '@styled-system/jsx';

const cardRecipe = cva({
  base: {
    borderRadius: 'lg',
    bg: 'bg.surface',
  },
  variants: {
    variant: {
      elevated: {
        boxShadow: 'md',
      },
      outline: {
        border: '1px solid',
        borderColor: 'border.default',
      },
      filled: {
        bg: 'bg.muted',
      },
    },
    padding: {
      none: { p: '0' },
      sm: { p: '3' },
      md: { p: '4' },
      lg: { p: '6' },
    },
  },
  defaultVariants: {
    variant: 'elevated',
    padding: 'md',
  },
});

export type CardVariants = RecipeVariantProps<typeof cardRecipe>;

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CardVariants {}

const StyledCard = styled('div', cardRecipe);

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant, padding, ...props }, ref) => {
    return (
      <StyledCard ref={ref} variant={variant} padding={padding} {...props}>
        {children}
      </StyledCard>
    );
  }
);

Card.displayName = 'Card';
