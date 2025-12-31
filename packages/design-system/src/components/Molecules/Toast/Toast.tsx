import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@lib/utils';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const toast = tv({
  base: 'flex items-start gap-3 p-4 rounded-lg shadow-lg border max-w-md',
  variants: {
    variant: {
      success: 'bg-success-50 border-success-200 text-success-900',
      error: 'bg-error-50 border-error-200 text-error-900',
      warning: 'bg-warning-50 border-warning-200 text-warning-900',
      info: 'bg-blue-50 border-blue-200 text-blue-900',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

export type ToastVariants = VariantProps<typeof toast>;

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, ToastVariants {
  onClose?: () => void;
  showIcon?: boolean;
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const iconColors = {
  success: 'text-success-600',
  error: 'text-error-600',
  warning: 'text-warning-600',
  info: 'text-blue-600',
};

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = 'info', children, onClose, showIcon = true, ...props }, ref) => {
    const IconComponent = icons[variant];

    return (
      <div ref={ref} className={cn(toast({ variant }), className)} role="alert" {...props}>
        {showIcon && <IconComponent className={cn('shrink-0', iconColors[variant])} size={20} />}
        <div className="flex-1">{children}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="shrink-0 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';
