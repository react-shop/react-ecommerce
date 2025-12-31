import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../../../lib/utils';
import { X } from 'lucide-react';

const overlay = tv({
  base: 'fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50',
});

const modal = tv({
  base: 'relative bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto',
  variants: {
    size: {
      sm: 'w-full max-w-sm',
      md: 'w-full max-w-md',
      lg: 'w-full max-w-lg',
      xl: 'w-full max-w-xl',
      '2xl': 'w-full max-w-2xl',
      full: 'w-full max-w-7xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type ModalVariants = VariantProps<typeof modal>;

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement>, ModalVariants {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  showCloseButton?: boolean;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      isOpen,
      onClose,
      title,
      showCloseButton = true,
      size,
      children,
      ...props
    },
    ref
  ) => {
    React.useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <div className={overlay()} onClick={onClose}>
        <div
          ref={ref}
          className={cn(modal({ size }), className)}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          {...props}
        >
          {(title || showCloseButton) && (
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              {title && <h2 className="text-xl font-semibold">{title}</h2>}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Close"
                >
                  <X size={24} />
                </button>
              )}
            </div>
          )}
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';
