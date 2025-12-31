import * as React from 'react';
import { styled } from '../../../styled-system/jsx';
import { inputRecipe, type InputVariants } from '../../theme/recipes';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputVariants {}

const StyledInput = styled('input', inputRecipe);

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size, variant, ...props }, ref) => {
    return <StyledInput ref={ref} size={size} variant={variant} {...props} />;
  }
);

Input.displayName = 'Input';

