import * as React from 'react';
import { styled } from '../../../styled-system/jsx';
import { cardRecipe, type CardVariants } from '../../theme/recipes';

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CardVariants {}

const StyledCard = styled('div', cardRecipe);

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant, padding, ...props }, ref) => {
    return (
      <StyledCard ref={ref} variant={variant} padding={padding} {...props}>
        {children}
      </StyledCard>
    );
  }
);

Card.displayName = 'Card';

