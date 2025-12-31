import * as React from 'react';
import { styled } from '../../../styled-system/jsx';
import { buttonRecipe, type ButtonVariants } from '../../theme/recipes';

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

