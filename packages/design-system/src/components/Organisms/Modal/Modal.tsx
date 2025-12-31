import * as React from 'react';
import { cva, type RecipeVariantProps } from '@styled-system/css';
import { styled } from '@styled-system/jsx';
import { X } from 'lucide-react';

const overlayRecipe = cva({
  base: {
    position: 'fixed',
    inset: '0',
    bg: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 'modal',
    padding: '4',
  },
});

const modalRecipe = cva({
  base: {
    bg: 'bg.surface',
    borderRadius: 'lg',
    boxShadow: '2xl',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
  },
  variants: {
    size: {
      sm: { maxWidth: '400px', width: '100%' },
      md: { maxWidth: '600px', width: '100%' },
      lg: { maxWidth: '800px', width: '100%' },
      xl: { maxWidth: '1200px', width: '100%' },
      full: { maxWidth: '100%', width: '100%', height: '100%' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type ModalVariants = RecipeVariantProps<typeof modalRecipe>;

export interface ModalProps extends ModalVariants {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
}

const StyledOverlay = styled('div', overlayRecipe);
const StyledModal = styled('div', modalRecipe);

export const Modal = ({ isOpen, onClose, children, title, showCloseButton = true, size }: ModalProps) => {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <StyledOverlay onClick={onClose}>
      <StyledModal size={size} onClick={(e) => e.stopPropagation()}>
        {(title || showCloseButton) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              borderBottom: '1px solid var(--colors-border-default)',
            }}
          >
            {title && <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{title}</h2>}
            {showCloseButton && (
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
        <div style={{ padding: '16px' }}>{children}</div>
      </StyledModal>
    </StyledOverlay>
  );
};

Modal.displayName = 'Modal';
