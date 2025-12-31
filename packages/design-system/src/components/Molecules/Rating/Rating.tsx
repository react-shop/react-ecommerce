import * as React from 'react';
import { cva, type RecipeVariantProps } from '@styled-system/css';
import { styled } from '@styled-system/jsx';
import { Star } from 'lucide-react';

const ratingRecipe = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '1',
  },
  variants: {
    size: {
      sm: { fontSize: 'sm' },
      md: { fontSize: 'md' },
      lg: { fontSize: 'lg' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type RatingVariants = RecipeVariantProps<typeof ratingRecipe>;

export interface RatingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    RatingVariants {
  value: number;
  max?: number;
  showValue?: boolean;
}

const StyledRating = styled('div', ratingRecipe);

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({ value, max = 5, showValue = false, size, ...props }, ref) => {
    const starSize = size === 'sm' ? 14 : size === 'md' ? 16 : 20;

    return (
      <StyledRating ref={ref} size={size} {...props}>
        {Array.from({ length: max }).map((_, index) => (
          <Star
            key={index}
            size={starSize}
            fill={index < Math.floor(value) ? '#fbbf24' : 'none'}
            stroke={index < value ? '#fbbf24' : '#d4d4d4'}
          />
        ))}
        {showValue && (
          <span style={{ marginLeft: '4px', color: 'var(--colors-text-secondary)' }}>
            ({value.toFixed(1)})
          </span>
        )}
      </StyledRating>
    );
  }
);

Rating.displayName = 'Rating';
