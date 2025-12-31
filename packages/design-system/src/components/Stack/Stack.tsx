import * as React from 'react';
import { Box } from '../Box';
import { css } from '../../../styled-system/css';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column';
  spacing?: string | number;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'column',
      spacing = '4',
      align = 'stretch',
      justify = 'start',
      wrap = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const stackClass = css({
      display: 'flex',
      flexDirection: direction,
      alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align,
      justifyContent:
        justify === 'start'
          ? 'flex-start'
          : justify === 'end'
          ? 'flex-end'
          : justify === 'between'
          ? 'space-between'
          : justify === 'around'
          ? 'space-around'
          : justify,
      flexWrap: wrap ? 'wrap' : 'nowrap',
      gap: spacing,
    });

    return (
      <Box ref={ref} className={`${stackClass} ${className || ''}`} {...props}>
        {children}
      </Box>
    );
  }
);

Stack.displayName = 'Stack';

