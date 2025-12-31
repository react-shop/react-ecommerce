import * as React from 'react';
import { Box } from '../Box';
import { css } from '../../../styled-system/css';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: string;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ maxWidth = '1280px', children, className, ...props }, ref) => {
    const containerClass = css({
      maxWidth,
      mx: 'auto',
      px: { base: '4', md: '6', lg: '8' },
      width: '100%',
    });

    return (
      <Box ref={ref} className={`${containerClass} ${className || ''}`} {...props}>
        {children}
      </Box>
    );
  }
);

Container.displayName = 'Container';

