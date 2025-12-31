import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('grid', className)} {...props} />;
  }
);

Grid.displayName = 'Grid';
