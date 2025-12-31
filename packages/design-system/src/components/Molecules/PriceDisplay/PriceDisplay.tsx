import * as React from 'react';
import { Box } from '../Box';
import { Text } from '../Text';
import { css } from '../../../styled-system/css';

export interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
}

const formatPrice = (price: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);
};

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  originalPrice,
  currency = 'USD',
  size = 'md',
}) => {
  const hasDiscount = originalPrice && originalPrice > price;
  const discount = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const fontSize = size === 'sm' ? 'md' : size === 'lg' ? '2xl' : 'xl';

  return (
    <Box className={css({ display: 'flex', alignItems: 'center', gap: '2', flexWrap: 'wrap' })}>
      <Text as="span" size={fontSize} weight="bold" className={css({ color: 'text.primary' })}>
        {formatPrice(price, currency)}
      </Text>
      {hasDiscount && (
        <>
          <Text
            as="span"
            size={size}
            className={css({ textDecoration: 'line-through', color: 'text.tertiary' })}
          >
            {formatPrice(originalPrice, currency)}
          </Text>
          <Text
            as="span"
            size={size}
            weight="semibold"
            className={css({ color: 'error.600', bg: 'error.50', px: '2', py: '0.5', borderRadius: 'base' })}
          >
            -{discount}%
          </Text>
        </>
      )}
    </Box>
  );
};

PriceDisplay.displayName = 'PriceDisplay';

