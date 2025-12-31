import * as React from 'react';
import { cva, type RecipeVariantProps } from '@styled-system/css';
import { styled } from '@styled-system/jsx';

const dividerRecipe = cva({
  base: {
    border: 'none',
    bg: 'border.default',
  },
  variants: {
    orientation: {
      horizontal: {
        width: '100%',
        height: '1px',
      },
      vertical: {
        width: '1px',
        height: 'auto',
      },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export type DividerVariants = RecipeVariantProps<typeof dividerRecipe>;

export interface DividerProps
  extends React.HTMLAttributes<HTMLHRElement>,
    DividerVariants {}

const StyledDivider = styled('hr', dividerRecipe);

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation, ...props }, ref) => {
    return <StyledDivider ref={ref} orientation={orientation} {...props} />;
  }
);

Divider.displayName = 'Divider';
