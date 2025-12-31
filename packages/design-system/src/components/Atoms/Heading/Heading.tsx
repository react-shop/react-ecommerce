import * as React from 'react';
import { styled } from '../../../styled-system/jsx';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

const StyledHeading = styled('h2');

const sizeMap = {
  xs: 'lg',
  sm: 'xl',
  md: '2xl',
  lg: '3xl',
  xl: '4xl',
  '2xl': '5xl',
  '3xl': '5xl',
  '4xl': '6xl',
  '5xl': '6xl',
  '6xl': '7xl',
} as const;

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as = 'h2', size = 'xl', weight = 'bold', children, ...props }, ref) => {
    return (
      <StyledHeading
        ref={ref}
        as={as}
        fontSize={sizeMap[size] || size}
        fontWeight={weight}
        fontFamily="heading"
        lineHeight="tight"
        {...props}
      >
        {children}
      </StyledHeading>
    );
  }
);

Heading.displayName = 'Heading';

