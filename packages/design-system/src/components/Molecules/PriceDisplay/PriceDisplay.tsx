import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@lib/utils';

const priceDisplay = tv({
  base: 'inline-flex items-baseline gap-2',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const originalPriceStyles = tv({
  base: 'text-gray-500 line-through',
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    },
  },
});

const currentPriceStyles = tv({
  base: 'font-semibold text-gray-900',
});

const discountBadgeStyles = tv({
  base: 'ml-2 px-2 py-0.5 rounded text-xs font-medium bg-error-100 text-error-700',
});

export type PriceDisplayVariants = VariantProps<typeof priceDisplay>;

export interface PriceDisplayProps extends React.HTMLAttributes<HTMLDivElement>, PriceDisplayVariants {
  price: number;
  originalPrice?: number;
  currency?: string;
  showDiscount?: boolean;
}

export const PriceDisplay = React.forwardRef<HTMLDivElement, PriceDisplayProps>(
  ({ className, price, originalPrice, currency = 'USD', showDiscount = true, size, ...props }, ref) => {
    const formatPrice = (value: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
      }).format(value);
    };

    const discountPercentage = originalPrice
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

    const hasDiscount = originalPrice && originalPrice > price;

    return (
      <div ref={ref} className={cn(priceDisplay({ size }), className)} {...props}>
        {hasDiscount && (
          <span className={originalPriceStyles({ size })}>{formatPrice(originalPrice)}</span>
        )}
        <span className={currentPriceStyles()}>{formatPrice(price)}</span>
        {hasDiscount && showDiscount && discountPercentage > 0 && (
          <span className={discountBadgeStyles()}>-{discountPercentage}%</span>
        )}
      </div>
    );
  }
);

PriceDisplay.displayName = 'PriceDisplay';
