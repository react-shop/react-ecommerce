import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { type LucideIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';

const icon = tv({
  base: 'inline-flex items-center justify-center shrink-0',
  variants: {
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
    },
    color: {
      primary: 'text-primary-600',
      secondary: 'text-gray-600',
      error: 'text-error-500',
      success: 'text-success-500',
      warning: 'text-warning-500',
      text: 'text-gray-900',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'text',
  },
});

export type IconVariants = VariantProps<typeof icon>;

export interface IconProps extends Omit<IconVariants, 'color'>, Omit<React.SVGProps<SVGSVGElement>, 'ref' | 'color'> {
  icon: React.ComponentType<any>;
  color?: IconVariants['color'];
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComponent, size, color, className, ...props }, ref) => {
    return (
      <IconComponent
        ref={ref}
        className={cn(icon({ size, color }), className)}
        {...props}
      />
    );
  }
);

Icon.displayName = 'Icon';
