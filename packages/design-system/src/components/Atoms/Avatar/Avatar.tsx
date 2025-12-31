import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { User } from 'lucide-react';
import { cn } from '@lib/utils';

const avatar = tv({
  base: 'inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-gray-200 text-gray-600',
  variants: {
    size: {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-base',
      lg: 'w-12 h-12 text-lg',
      xl: 'w-16 h-16 text-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type AvatarVariants = VariantProps<typeof avatar>;

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement>, AvatarVariants {
  src?: string;
  alt?: string;
  name?: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, name, size, ...props }, ref) => {
    const [error, setError] = React.useState(false);

    const getInitials = (name: string) => {
      const parts = name.split(' ');
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    };

    const iconSize = {
      xs: 12,
      sm: 16,
      md: 20,
      lg: 24,
      xl: 32,
    }[size || 'md'];

    return (
      <div ref={ref} className={cn(avatar({ size }), className)} {...props}>
        {src && !error ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            onError={() => setError(true)}
            className="w-full h-full object-cover"
          />
        ) : name ? (
          <span className="font-medium">{getInitials(name)}</span>
        ) : (
          <User size={iconSize} />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
