import * as React from 'react';
import { cva, type RecipeVariantProps } from '@styled-system/css';
import { styled } from '@styled-system/jsx';

const buttonRecipe = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2',
    fontWeight: 'medium',
    borderRadius: 'md',
    transition: 'all 0.2s',
    cursor: 'pointer',
    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  variants: {
    variant: {
      solid: {
        bg: 'primary.default',
        color: 'primary.text',
        _hover: {
          bg: 'primary.emphasis',
        },
      },
      outline: {
        border: '1px solid',
        borderColor: 'border.default',
        color: 'text.primary',
        _hover: {
          bg: 'bg.muted',
        },
      },
      ghost: {
        color: 'text.primary',
        _hover: {
          bg: 'bg.muted',
        },
      },
    },
    size: {
      sm: {
        px: '3',
        py: '1.5',
        fontSize: 'sm',
      },
      md: {
        px: '4',
        py: '2',
        fontSize: 'md',
      },
      lg: {
        px: '6',
        py: '3',
        fontSize: 'lg',
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
});

export type ButtonVariants = RecipeVariantProps<typeof buttonRecipe>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const StyledButton = styled('button', buttonRecipe);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      isLoading,
      leftIcon,
      rightIcon,
      disabled,
      variant,
      size,
      fullWidth,
      ...props
    },
    ref
  ) => {
    return (
      <StyledButton
        ref={ref}
        disabled={disabled || isLoading}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        {...props}
      >
        {isLoading && <span>Loading...</span>}
        {!isLoading && leftIcon && <span>{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span>{rightIcon}</span>}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

