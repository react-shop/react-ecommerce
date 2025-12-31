/**
 * Component recipes for the design system
 * Recipes provide reusable component styles with variants
 */

import { cva, type RecipeVariantProps } from '../../styled-system/css';

// Button recipe
export const buttonRecipe = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'medium',
    borderRadius: 'md',
    cursor: 'pointer',
    transition: 'all 0.2s',
    outline: 'none',
    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    _focus: {
      ring: '2px',
      ringOffset: '2px',
    },
  },
  variants: {
    variant: {
      solid: {
        bg: 'primary.default',
        color: 'primary.text',
        _hover: {
          bg: 'primary.emphasis',
        },
      },
      outline: {
        borderWidth: '1px',
        borderColor: 'border.default',
        color: 'text.primary',
        _hover: {
          bg: 'bg.muted',
        },
      },
      ghost: {
        color: 'text.primary',
        _hover: {
          bg: 'bg.muted',
        },
      },
      link: {
        color: 'primary.default',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
    size: {
      sm: {
        fontSize: 'sm',
        px: '3',
        py: '2',
        gap: '1',
      },
      md: {
        fontSize: 'md',
        px: '4',
        py: '2.5',
        gap: '2',
      },
      lg: {
        fontSize: 'lg',
        px: '6',
        py: '3',
        gap: '2',
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
});

export type ButtonVariants = RecipeVariantProps<typeof buttonRecipe>;

// Card recipe
export const cardRecipe = cva({
  base: {
    bg: 'bg.surface',
    borderRadius: 'lg',
    borderWidth: '1px',
    borderColor: 'border.default',
    overflow: 'hidden',
  },
  variants: {
    variant: {
      elevated: {
        boxShadow: 'md',
        borderWidth: '0',
      },
      outline: {
        boxShadow: 'none',
      },
    },
    padding: {
      none: {
        p: '0',
      },
      sm: {
        p: '4',
      },
      md: {
        p: '6',
      },
      lg: {
        p: '8',
      },
    },
  },
  defaultVariants: {
    variant: 'outline',
    padding: 'md',
  },
});

export type CardVariants = RecipeVariantProps<typeof cardRecipe>;

// Badge recipe
export const badgeRecipe = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    fontWeight: 'medium',
    borderRadius: 'base',
    fontSize: 'xs',
    px: '2',
    py: '0.5',
  },
  variants: {
    variant: {
      solid: {
        bg: 'primary.default',
        color: 'primary.text',
      },
      subtle: {
        bg: 'bg.muted',
        color: 'text.primary',
      },
      outline: {
        borderWidth: '1px',
        borderColor: 'border.default',
        color: 'text.primary',
      },
    },
    colorScheme: {
      brand: {},
      success: {
        bg: 'success.500',
        color: 'white',
      },
      error: {
        bg: 'error.500',
        color: 'white',
      },
      warning: {
        bg: 'warning.500',
        color: 'white',
      },
    },
  },
  defaultVariants: {
    variant: 'solid',
  },
});

export type BadgeVariants = RecipeVariantProps<typeof badgeRecipe>;

// Input recipe
export const inputRecipe = cva({
  base: {
    width: '100%',
    borderRadius: 'md',
    borderWidth: '1px',
    borderColor: 'border.default',
    bg: 'bg.surface',
    color: 'text.primary',
    px: '3',
    py: '2',
    fontSize: 'md',
    outline: 'none',
    transition: 'all 0.2s',
    _focus: {
      borderColor: 'primary.default',
      ring: '1px',
      ringColor: 'primary.default',
    },
    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    _placeholder: {
      color: 'text.tertiary',
    },
  },
  variants: {
    size: {
      sm: {
        fontSize: 'sm',
        px: '2.5',
        py: '1.5',
      },
      md: {
        fontSize: 'md',
        px: '3',
        py: '2',
      },
      lg: {
        fontSize: 'lg',
        px: '4',
        py: '3',
      },
    },
    variant: {
      outline: {},
      filled: {
        bg: 'bg.muted',
        borderColor: 'transparent',
        _focus: {
          bg: 'bg.surface',
          borderColor: 'primary.default',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
});

export type InputVariants = RecipeVariantProps<typeof inputRecipe>;

