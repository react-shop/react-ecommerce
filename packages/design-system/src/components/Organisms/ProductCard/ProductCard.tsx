import * as React from 'react';
import { cva, type RecipeVariantProps } from '@styled-system/css';
import { styled } from '@styled-system/jsx';
import { Star } from 'lucide-react';

const productCardRecipe = cva({
  base: {
    borderRadius: 'lg',
    overflow: 'hidden',
    transition: 'all 0.2s',
    cursor: 'pointer',
    bg: 'bg.surface',
    _hover: {
      boxShadow: 'lg',
      transform: 'translateY(-2px)',
    },
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
    },
  },
  defaultVariants: {
    variant: 'elevated',
  },
});

export type ProductCardVariants = RecipeVariantProps<typeof productCardRecipe>;

export interface ProductCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ProductCardVariants {
  title: string;
  price: number;
  image: string;
  rating?: number;
  discount?: number;
  onAddToCart?: () => void;
}

const StyledProductCard = styled('div', productCardRecipe);

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ title, price, image, rating, discount, onAddToCart, variant, ...props }, ref) => {
    return (
      <StyledProductCard ref={ref} variant={variant} {...props}>
        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden' }}>
          <img
            src={image}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {discount && discount > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                bg: 'error.500',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              -{discount}%
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '16px' }}>
          {/* Title */}
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '8px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </h3>

          {/* Rating */}
          {rating !== undefined && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={14}
                  fill={index < Math.floor(rating) ? '#fbbf24' : 'none'}
                  stroke={index < rating ? '#fbbf24' : '#d4d4d4'}
                />
              ))}
              <span style={{ fontSize: '14px', color: 'var(--colors-text-secondary)', marginLeft: '4px' }}>
                ({rating.toFixed(1)})
              </span>
            </div>
          )}

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--colors-primary-default)' }}>
              ${price.toFixed(2)}
            </span>
            {discount && discount > 0 && (
              <span
                style={{
                  fontSize: '14px',
                  textDecoration: 'line-through',
                  color: 'var(--colors-text-secondary)',
                }}
              >
                ${(price / (1 - discount / 100)).toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          {onAddToCart && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              style={{
                width: '100%',
                padding: '8px 16px',
                bg: 'var(--colors-primary-default)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Add to Cart
            </button>
          )}
        </div>
      </StyledProductCard>
    );
  }
);

ProductCard.displayName = 'ProductCard';
