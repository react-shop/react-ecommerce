import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../../../lib/utils';
import { Badge } from '../../Atoms/Badge/Badge';
import { PriceDisplay } from '../../Molecules/PriceDisplay/PriceDisplay';
import { Rating } from '../../Molecules/Rating/Rating';

const productCard = tv({
  base: 'group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow',
  variants: {
    variant: {
      default: '',
      compact: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const imageContainer = tv({
  base: 'relative aspect-square overflow-hidden bg-gray-100',
});

const image = tv({
  base: 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-300',
});

const content = tv({
  base: 'p-4',
  variants: {
    variant: {
      default: '',
      compact: 'p-3',
    },
  },
});

export type ProductCardVariants = VariantProps<typeof productCard>;

export interface ProductCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ProductCardVariants {
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  onAddToCart?: () => void;
}

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className,
      variant,
      image: imageSrc,
      title,
      price,
      originalPrice,
      rating,
      reviewCount,
      badge,
      onAddToCart,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn(productCard({ variant }), className)} {...props}>
        <div className={imageContainer()}>
          <img src={imageSrc} alt={title} className={image()} />
          {badge && (
            <div className="absolute top-2 left-2">
              <Badge variant="solid" colorScheme="error">
                {badge}
              </Badge>
            </div>
          )}
        </div>

        <div className={content({ variant })}>
          <h3 className="text-base font-medium text-gray-900 line-clamp-2 mb-2">{title}</h3>

          {rating !== undefined && (
            <div className="flex items-center gap-2 mb-2">
              <Rating value={rating} size="sm" />
              {reviewCount !== undefined && (
                <span className="text-xs text-gray-500">({reviewCount})</span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between">
            <PriceDisplay
              price={price}
              originalPrice={originalPrice}
              size="md"
              showDiscount={false}
            />
            {originalPrice && originalPrice > price && (
              <Badge variant="solid" colorScheme="error">
                -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
              </Badge>
            )}
          </div>

          {onAddToCart && (
            <button
              onClick={onAddToCart}
              className="mt-3 w-full bg-primary-600 text-white py-2 rounded-md font-medium hover:bg-primary-700 transition-colors"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    );
  }
);

ProductCard.displayName = 'ProductCard';
