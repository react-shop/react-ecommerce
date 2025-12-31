import { forwardRef, useEffect } from 'react';
import { css } from '../../../styled-system/css';
import { X } from 'lucide-react';
import { Icon } from '../Icon';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
  sm: '400px',
  md: '600px',
  lg: '800px',
  xl: '1000px',
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, title, children, size = 'md' }, ref) => {
    useEffect(() => {
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
      <div
        className={css({
          position: 'fixed',
          inset: 0,
          zIndex: 'modal',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        <div
          className={css({
            position: 'absolute',
            inset: 0,
            bg: 'rgba(0, 0, 0, 0.5)',
          })}
          onClick={onClose}
        />
        <div
          ref={ref}
          className={css({
            position: 'relative',
            bg: 'bg.surface',
            borderRadius: 'lg',
            boxShadow: 'xl',
            maxWidth: sizeMap[size],
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
          })}
        >
          {title && (
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: '6',
                borderBottomWidth: '1px',
                borderColor: 'border.default',
              })}
            >
              <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold' })}>
                {title}
              </h2>
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
            </div>
          )}
          <div className={css({ p: '6' })}>{children}</div>
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

