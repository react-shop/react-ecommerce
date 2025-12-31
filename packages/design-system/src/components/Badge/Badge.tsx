import * as React from 'react';
import { styled } from '../../../styled-system/jsx';
import { badgeRecipe, type BadgeVariants } from '../../theme/recipes';

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

