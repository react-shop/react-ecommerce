import { css, cva, type RecipeVariantProps } from '../../../styled-system/css';

const dividerStyles = cva({
  base: {
    borderColor: 'border.default',
    borderStyle: 'solid',
  },
  variants: {
    orientation: {
      horizontal: {
        borderBottomWidth: '1px',
        width: '100%',
        height: 0,
      },
      vertical: {
        borderLeftWidth: '1px',
        height: '100%',
        width: 0,
      },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export interface DividerProps extends RecipeVariantProps<typeof dividerStyles> {
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ orientation, className }) => {
  return <div className={css(dividerStyles.raw({ orientation }), className)} />;
};

