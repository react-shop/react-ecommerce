import * as React from 'react';
import { Box } from '../Box';
import { Text } from '../Text';
import { css } from '../../../styled-system/css';

export interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = true,
  reviewCount,
}) => {
  const starSize = size === 'sm' ? '16px' : size === 'lg' ? '24px' : '20px';
  const fontSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md';

  return (
    <Box className={css({ display: 'flex', alignItems: 'center', gap: '2' })}>
      <Box className={css({ display: 'flex', gap: '1' })}>
        {Array.from({ length: maxRating }, (_, index) => {
          const filled = index < Math.floor(rating);
          const partial = index === Math.floor(rating) && rating % 1 !== 0;
          const percentage = partial ? (rating % 1) * 100 : 0;

          return (
            <Box
              key={index}
              className={css({
                position: 'relative',
                width: starSize,
                height: starSize,
              })}
            >
              {/* Background star */}
              <svg
                width={starSize}
                height={starSize}
                viewBox="0 0 24 24"
                fill={filled ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
                className={css({ color: filled ? 'warning.500' : 'neutral.300' })}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {/* Partial fill */}
              {partial && (
                <Box
                  className={css({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    overflow: 'hidden',
                  })}
                  style={{ width: `${percentage}%` }}
                >
                  <svg
                    width={starSize}
                    height={starSize}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={css({ color: 'warning.500' })}
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
      {showValue && (
        <Text as="span" size={fontSize} weight="medium" className={css({ color: 'text.primary' })}>
          {rating.toFixed(1)}
        </Text>
      )}
      {reviewCount !== undefined && (
        <Text as="span" size={fontSize} className={css({ color: 'text.tertiary' })}>
          ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
        </Text>
      )}
    </Box>
  );
};

Rating.displayName = 'Rating';

