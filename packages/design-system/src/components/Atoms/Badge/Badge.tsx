import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@lib/utils";

const badge = tv({
  base: "inline-flex items-center rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap",
  variants: {
    variant: {
      solid: "bg-primary-600 text-white",
      subtle: "bg-gray-100 text-gray-900",
      outline: "border border-gray-300 bg-transparent text-gray-900",
    },
    colorScheme: {
      primary: "",
      success: "",
      error: "",
      warning: "",
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      colorScheme: "success",
      class: "bg-success-500 text-white",
    },
    {
      variant: "solid",
      colorScheme: "error",
      class: "bg-error-500 text-white",
    },
    {
      variant: "solid",
      colorScheme: "warning",
      class: "bg-warning-500 text-white",
    },
  ],
  defaultVariants: {
    variant: "subtle",
  },
});

export type BadgeVariants = VariantProps<typeof badge>;

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, BadgeVariants {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, children, variant, colorScheme, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badge({ variant, colorScheme }), className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
