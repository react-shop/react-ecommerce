import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('flex flex-col', className)} {...props} />;
  }
);

Stack.displayName = 'Stack';
