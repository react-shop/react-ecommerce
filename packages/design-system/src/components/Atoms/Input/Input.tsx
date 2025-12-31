import * as React from 'react';
import { cva, type RecipeVariantProps } from '@styled-system/css';
import { styled } from '@styled-system/jsx';

const inputRecipe = cva({
  base: {
    width: '100%',
    px: '3',
    py: '2',
    borderRadius: 'md',
    fontSize: 'md',
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
      sm: {
        px: '2',
        py: '1.5',
        fontSize: 'sm',
      },
      md: {
        px: '3',
        py: '2',
        fontSize: 'md',
      },
      lg: {
        px: '4',
        py: '3',
        fontSize: 'lg',
      },
    },
    isInvalid: {
      true: {
        borderColor: 'error.default',
        _focus: {
          ringColor: 'error.default',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
});

export type InputVariants = RecipeVariantProps<typeof inputRecipe>;

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    InputVariants {}

const StyledInput = styled('input', inputRecipe);

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant, size, isInvalid, ...props }, ref) => {
    return (
      <StyledInput
        ref={ref}
        variant={variant}
        size={size}
        isInvalid={isInvalid}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
