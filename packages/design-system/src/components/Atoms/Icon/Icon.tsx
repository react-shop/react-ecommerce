import { forwardRef } from 'react';
import { css } from '../../../styled-system/css';
import type { LucideIcon } from 'lucide-react';

export interface IconProps {
  icon: LucideIcon;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

const sizeMap = {
  xs: '12px',
  sm: '16px',
  md: '20px',
  lg: '24px',
  xl: '32px',
};

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComponent, size = 'md', color, className }, ref) => {
    return (
      <IconComponent
        ref={ref}
        className={css(
          {
            flexShrink: 0,
          },
          className
        )}
        size={sizeMap[size]}
        color={color}
      />
    );
  }
);

Icon.displayName = 'Icon';

