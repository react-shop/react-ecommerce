import * as React from 'react';
import { cva, type RecipeVariantProps } from '@styled-system/css';
import { styled } from '@styled-system/jsx';
import { ChevronDown } from 'lucide-react';

const selectRecipe = cva({
  base: {
    position: 'relative',
    width: '100%',
  },
});

const selectInputRecipe = cva({
  base: {
    width: '100%',
    px: '3',
    py: '2',
    pr: '10',
    borderRadius: 'md',
    fontSize: 'md',
    appearance: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    _focus: {
      outline: 'none',
      ring: '2px',
      ringColor: 'primary.default',
    },
    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  variants: {
    variant: {
      outline: {
        border: '1px solid',
        borderColor: 'border.default',
        bg: 'bg.surface',
        _hover: {
          borderColor: 'border.emphasis',
        },
      },
      filled: {
        bg: 'bg.muted',
        border: '1px solid transparent',
        _hover: {
          bg: 'bg.subtle',
        },
      },
    },
    size: {
      sm: { px: '2', py: '1.5', fontSize: 'sm' },
      md: { px: '3', py: '2', fontSize: 'md' },
      lg: { px: '4', py: '3', fontSize: 'lg' },
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
});

export type SelectVariants = RecipeVariantProps<typeof selectInputRecipe>;

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    SelectVariants {}

const StyledSelectWrapper = styled('div', selectRecipe);
const StyledSelect = styled('select', selectInputRecipe);

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, variant, size, ...props }, ref) => {
    return (
      <StyledSelectWrapper>
        <StyledSelect ref={ref} variant={variant} size={size} {...props}>
          {children}
        </StyledSelect>
        <ChevronDown
          size={16}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
          }}
        />
      </StyledSelectWrapper>
    );
  }
);

Select.displayName = 'Select';
