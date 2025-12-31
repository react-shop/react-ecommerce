import * as React from 'react';
import { Card } from '../Card';
import { Box } from '../Box';
import { Text } from '../Text';
import { Button } from '../Button';
import { PriceDisplay } from '../PriceDisplay';
import { Rating } from '../Rating';
import { Badge } from '../Badge';
import { css } from '../../../styled-system/css';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  inStock?: boolean;
  onAddToCart?: (id: string) => void;
  onClick?: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviewCount,
  badge,
  inStock = true,
  onAddToCart,
  onClick,
}) => {
  return (
    <Card
      variant="elevated"
      padding="none"
      className={css({
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        _hover: {
          transform: 'translateY(-4px)',
          boxShadow: 'lg',
        },
      })}
      onClick={() => onClick?.(id)}
    >
      {/* Image Container */}
      <Box className={css({ position: 'relative', paddingBottom: '100%', overflow: 'hidden' })}>
        <img
          src={image}
          alt={name}
          className={css({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          })}
        />
        {badge && (
          <Box className={css({ position: 'absolute', top: '2', right: '2' })}>
            <Badge variant="solid" colorScheme="error">
              {badge}
            </Badge>
          </Box>
        )}
        {!inStock && (
          <Box
            className={css({
              position: 'absolute',
              inset: 0,
              bg: 'rgba(0, 0, 0, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            <Badge variant="solid">Out of Stock</Badge>
          </Box>
        )}
      </Box>

      {/* Content */}
      <Box className={css({ p: '4' })}>
        <Text
          as="h3"
          size="md"
          weight="semibold"
          className={css({
            mb: '2',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          })}
        >
          {name}
        </Text>

        {rating !== undefined && (
          <Box className={css({ mb: '3' })}>
            <Rating rating={rating} reviewCount={reviewCount} size="sm" />
          </Box>
        )}

        <Box className={css({ mb: '4' })}>
          <PriceDisplay price={price} originalPrice={originalPrice} size="md" />
        </Box>

        {inStock && onAddToCart && (
          <Button
            size="sm"
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(id);
            }}
          >
            Add to Cart
          </Button>
        )}
      </Box>
    </Card>
  );
};

ProductCard.displayName = 'ProductCard';

