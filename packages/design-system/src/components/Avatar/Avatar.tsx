import { css, cva, type RecipeVariantProps } from '../../../styled-system/css';
import { User } from 'lucide-react';
import { Icon } from '../Icon';

const avatarStyles = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'full',
    overflow: 'hidden',
    bg: 'bg.muted',
    color: 'text.secondary',
    flexShrink: 0,
  },
  variants: {
    size: {
      xs: { width: '6', height: '6' },
      sm: { width: '8', height: '8' },
      md: { width: '10', height: '10' },
      lg: { width: '12', height: '12' },
      xl: { width: '16', height: '16' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface AvatarProps extends RecipeVariantProps<typeof avatarStyles> {
  src?: string;
  alt?: string;
  name?: string;
  className?: string;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size,
  className,
}) => {
  return (
    <div className={css(avatarStyles.raw({ size }), className)}>
      {src ? (
        <img src={src} alt={alt || name} className={css({ width: '100%', height: '100%', objectFit: 'cover' })} />
      ) : name ? (
        <span className={css({ fontSize: 'sm', fontWeight: 'medium' })}>
          {getInitials(name)}
        </span>
      ) : (
        <Icon icon={User} size={size === 'xs' || size === 'sm' ? 'xs' : 'sm'} />
      )}
    </div>
  );
};

