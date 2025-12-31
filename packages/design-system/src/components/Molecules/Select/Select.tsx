import { forwardRef } from 'react';
import { css, cva, type RecipeVariantProps } from '../../../styled-system/css';

const selectStyles = cva({
  base: {
    width: '100%',
    px: '3',
    py: '2',
    fontSize: 'md',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: 'md',
    outline: 'none',
    transition: 'all 0.2s',
    bg: 'bg.surface',
    color: 'text.primary',
    borderColor: 'border.default',
    cursor: 'pointer',
    _focus: {
      borderColor: 'primary.default',
      boxShadow: '0 0 0 3px token(colors.brand.100)',
    },
    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  variants: {
    size: {
      sm: { px: '2', py: '1', fontSize: 'sm' },
      md: { px: '3', py: '2', fontSize: 'md' },
      lg: { px: '4', py: '3', fontSize: 'lg' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    RecipeVariantProps<typeof selectStyles> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ size, className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={css(selectStyles.raw({ size }), className)}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

