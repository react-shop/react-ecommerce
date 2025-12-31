import { css, cva, type RecipeVariantProps } from '../../../styled-system/css';

const skeletonStyles = cva({
  base: {
    bg: 'bg.muted',
    borderRadius: 'md',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
  variants: {
    variant: {
      text: { height: '4' },
      circular: { borderRadius: 'full' },
      rectangular: {},
    },
  },
  defaultVariants: {
    variant: 'rectangular',
  },
});

export interface SkeletonProps extends RecipeVariantProps<typeof skeletonStyles> {
  width?: string;
  height?: string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant,
  width,
  height,
  className,
}) => {
  return (
    <div
      className={css(
        skeletonStyles.raw({ variant }),
        { width, height },
        className
      )}
    />
  );
};

