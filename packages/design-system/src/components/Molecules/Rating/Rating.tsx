import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@lib/utils';
import { Star } from 'lucide-react';

const rating = tv({
  base: 'inline-flex items-center gap-1',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type RatingVariants = VariantProps<typeof rating>;

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>, RatingVariants {
  value: number;
  max?: number;
  showValue?: boolean;
  readonly?: boolean;
  onChange?: (value: number) => void;
}

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      value,
      max = 5,
      showValue = false,
      readonly = true,
      onChange,
      size,
      ...props
    },
    ref
  ) => {
    const starSize = {
      sm: 14,
      md: 18,
      lg: 22,
    }[size || 'md'];

    const handleClick = (index: number) => {
      if (!readonly && onChange) {
        onChange(index + 1);
      }
    };

    return (
      <div ref={ref} className={cn(rating({ size }), className)} {...props}>
        <div className="flex gap-0.5">
          {Array.from({ length: max }).map((_, index) => {
            const filled = index < Math.floor(value);
            const partial = index === Math.floor(value) && value % 1 !== 0;

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleClick(index)}
                disabled={readonly}
                className={cn(
                  'relative',
                  !readonly && 'cursor-pointer hover:scale-110 transition-transform',
                  readonly && 'cursor-default'
                )}
                aria-label={`Rate ${index + 1} out of ${max}`}
              >
                {partial ? (
                  <div className="relative">
                    <Star size={starSize} className="text-gray-300" fill="currentColor" />
                    <div
                      className="absolute top-0 left-0 overflow-hidden"
                      style={{ width: `${(value % 1) * 100}%` }}
                    >
                      <Star size={starSize} className="text-warning-400" fill="currentColor" />
                    </div>
                  </div>
                ) : (
                  <Star
                    size={starSize}
                    className={filled ? 'text-warning-400' : 'text-gray-300'}
                    fill="currentColor"
                  />
                )}
              </button>
            );
          })}
        </div>
        {showValue && (
          <span className="ml-2 font-medium text-gray-700">
            {value.toFixed(1)}
          </span>
        )}
      </div>
    );
  }
);

Rating.displayName = 'Rating';
