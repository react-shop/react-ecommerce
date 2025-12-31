import { forwardRef } from 'react';
import { css, cva, type RecipeVariantProps } from '../../../styled-system/css';

const inputStyles = cva({
  base: {
    width: '100%',
    px: '3',
    py: '2',
    fontSize: 'md',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: 'md',
    outline: 'none',
    transition: 'all 0.2s',
    bg: 'bg.surface',
    color: 'text.primary',
    borderColor: 'border.default',
    _placeholder: {
      color: 'text.tertiary',
    },
    _focus: {
      borderColor: 'primary.default',
      boxShadow: '0 0 0 3px token(colors.brand.100)',
    },
    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  variants: {
    size: {
      sm: { px: '2', py: '1', fontSize: 'sm' },
      md: { px: '3', py: '2', fontSize: 'md' },
      lg: { px: '4', py: '3', fontSize: 'lg' },
    },
    variant: {
      outline: {},
      filled: {
        bg: 'bg.muted',
        borderColor: 'transparent',
        _focus: {
          bg: 'bg.surface',
          borderColor: 'primary.default',
        },
      },
    },
    isInvalid: {
      true: {
        borderColor: 'error.500',
        _focus: {
          borderColor: 'error.500',
          boxShadow: '0 0 0 3px token(colors.error.100)',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
});

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    RecipeVariantProps<typeof inputStyles> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size, variant, isInvalid, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={css(inputStyles.raw({ size, variant, isInvalid }), className)}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
