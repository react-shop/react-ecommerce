import { css, cva } from '../../../styled-system/css';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Icon } from '../Icon';

const toastStyles = cva({
  base: {
    display: 'flex',
    alignItems: 'start',
    gap: '3',
    p: '4',
    borderRadius: 'lg',
    boxShadow: 'lg',
    minWidth: '300px',
    maxWidth: '500px',
    bg: 'bg.surface',
    borderWidth: '1px',
  },
  variants: {
    variant: {
      success: { borderColor: 'success.500' },
      error: { borderColor: 'error.500' },
      warning: { borderColor: 'warning.500' },
      info: { borderColor: 'brand.500' },
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: '#22c55e',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#0ea5e9',
};

export interface ToastProps {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  variant = 'info',
  title,
  description,
  onClose,
}) => {
  const IconComponent = iconMap[variant];

  return (
    <div className={toastStyles({ variant })}>
      <Icon icon={IconComponent} color={colorMap[variant]} />
      <div className={css({ flex: 1 })}>
        <div className={css({ fontWeight: 'semibold', mb: '1' })}>{title}</div>
        {description && (
          <div className={css({ fontSize: 'sm', color: 'text.secondary' })}>
            {description}
          </div>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={css({
            p: '1',
            borderRadius: 'md',
            cursor: 'pointer',
            border: 'none',
            bg: 'transparent',
            _hover: { bg: 'bg.muted' },
          })}
        >
          <Icon icon={X} size="sm" />
        </button>
      )}
    </div>
  );
};

