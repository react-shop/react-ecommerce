import * as React from 'react';
import { cva, type RecipeVariantProps } from '@styled-system/css';
import { styled } from '@styled-system/jsx';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

const toastRecipe = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '3',
    p: '4',
    borderRadius: 'md',
    boxShadow: 'lg',
    minWidth: '300px',
  },
  variants: {
    variant: {
      success: {
        bg: 'success.50',
        borderLeft: '4px solid',
        borderColor: 'success.500',
        color: 'success.900',
      },
      error: {
        bg: 'error.50',
        borderLeft: '4px solid',
        borderColor: 'error.500',
        color: 'error.900',
      },
      warning: {
        bg: 'warning.50',
        borderLeft: '4px solid',
        borderColor: 'warning.500',
        color: 'warning.900',
      },
      info: {
        bg: 'brand.50',
        borderLeft: '4px solid',
        borderColor: 'brand.500',
        color: 'brand.900',
      },
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

export type ToastVariants = RecipeVariantProps<typeof toastRecipe>;

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ToastVariants {
  title?: string;
  description?: string;
}

const StyledToast = styled('div', toastRecipe);

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ variant = 'info', title, description, children, ...props }, ref) => {
    const Icon = icons[variant];

    return (
      <StyledToast ref={ref} variant={variant} {...props}>
        <Icon size={20} />
        <div>
          {title && <div style={{ fontWeight: 600 }}>{title}</div>}
          {description && <div style={{ fontSize: '14px' }}>{description}</div>}
          {children}
        </div>
      </StyledToast>
    );
  }
);

Toast.displayName = 'Toast';
