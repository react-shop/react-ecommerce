import * as React from 'react';
import { cva, type RecipeVariantProps } from '@styled-system/css';
import { styled } from '@styled-system/jsx';
import { Icon as LucideIcon, type IconNode } from 'lucide-react';

const iconRecipe = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  variants: {
    size: {
      xs: { w: '3', h: '3' },
      sm: { w: '4', h: '4' },
      md: { w: '5', h: '5' },
      lg: { w: '6', h: '6' },
      xl: { w: '8', h: '8' },
    },
    color: {
      primary: { color: 'primary.default' },
      secondary: { color: 'text.secondary' },
      error: { color: 'error.default' },
      success: { color: 'success.default' },
      warning: { color: 'warning.default' },
      text: { color: 'text.primary' },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'text',
  },
});

export type IconVariants = RecipeVariantProps<typeof iconRecipe>;

export interface IconProps extends IconVariants, React.SVGProps<SVGSVGElement> {
  icon: IconNode;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ icon, size, color, ...props }, ref) => {
    const StyledIcon = styled(LucideIcon, iconRecipe);
    return <StyledIcon ref={ref} icon={icon} size={size} color={color} {...props} />;
  }
);

Icon.displayName = 'Icon';
