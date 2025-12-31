import * as React from 'react';
import { cva, type RecipeVariantProps } from '@styled-system/css';
import { styled } from '@styled-system/jsx';

const priceRecipe = cva({
  base: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '2',
  },
  variants: {
    size: {
      sm: { fontSize: 'sm' },
      md: { fontSize: 'md' },
      lg: { fontSize: 'lg' },
      xl: { fontSize: 'xl' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type PriceDisplayVariants = RecipeVariantProps<typeof priceRecipe>;

export interface PriceDisplayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PriceDisplayVariants {
  amount: number;
  currency?: string;
  originalAmount?: number;
}

const StyledPrice = styled('div', priceRecipe);

export const PriceDisplay = React.forwardRef<HTMLDivElement, PriceDisplayProps>(
  ({ amount, currency = 'USD', originalAmount, size, ...props }, ref) => {
    const formatPrice = (value: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
      }).format(value);
    };

    return (
      <StyledPrice ref={ref} size={size} {...props}>
        <span style={{ fontWeight: 'bold', color: 'var(--colors-text-primary)' }}>
          {formatPrice(amount)}
        </span>
        {originalAmount && originalAmount > amount && (
          <span
            style={{
              textDecoration: 'line-through',
              color: 'var(--colors-text-secondary)',
              fontSize: '0.875em',
            }}
          >
            {formatPrice(originalAmount)}
          </span>
        )}
      </StyledPrice>
    );
  }
);

PriceDisplay.displayName = 'PriceDisplay';
