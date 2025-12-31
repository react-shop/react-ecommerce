import * as React from 'react';
import { cva, type RecipeVariantProps } from '@styled-system/css';
import { styled } from '@styled-system/jsx';

const badgeRecipe = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    px: '2',
    py: '1',
    borderRadius: 'md',
    fontSize: 'sm',
    fontWeight: 'medium',
    whiteSpace: 'nowrap',
  },
  variants: {
    variant: {
      solid: {
        bg: 'primary.default',
        color: 'primary.text',
      },
      subtle: {
        bg: 'bg.muted',
        color: 'text.primary',
      },
      outline: {
        border: '1px solid',
        borderColor: 'border.default',
        color: 'text.primary',
      },
    },
    colorScheme: {
      primary: {},
      success: {},
      error: {},
      warning: {},
    },
  },
  defaultVariants: {
    variant: 'subtle',
  },
});

export type BadgeVariants = RecipeVariantProps<typeof badgeRecipe>;

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    BadgeVariants {}

const StyledBadge = styled('span', badgeRecipe);

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant, colorScheme, ...props }, ref) => {
    return (
      <StyledBadge ref={ref} variant={variant} colorScheme={colorScheme} {...props}>
        {children}
      </StyledBadge>
    );
  }
);

Badge.displayName = 'Badge';

