import * as React from 'react';
import { styled } from '@styled-system/jsx';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div' | 'label';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
}

const StyledText = styled('p');

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ as = 'p', size = 'md', weight = 'normal', align = 'left', children, ...props }, ref) => {
    return (
      <StyledText
        ref={ref}
        as={as}
        fontSize={size}
        fontWeight={weight}
        textAlign={align}
        {...props}
      >
        {children}
      </StyledText>
    );
  }
);

Text.displayName = 'Text';

