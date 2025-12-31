import * as React from "react";
import { cva, type RecipeVariantProps } from "@styled-system/css";
import { styled } from "@styled-system/jsx";
import { User } from "lucide-react";

const avatarRecipe = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    borderRadius: "full",
    overflow: "hidden",
    bg: "bg.muted",
    color: "text.secondary",
  },
  variants: {
    size: {
      xs: { w: "6", h: "6", fontSize: "xs" },
      sm: { w: "8", h: "8", fontSize: "sm" },
      md: { w: "10", h: "10", fontSize: "md" },
      lg: { w: "12", h: "12", fontSize: "lg" },
      xl: { w: "16", h: "16", fontSize: "xl" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type AvatarVariants = RecipeVariantProps<typeof avatarRecipe>;

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>, AvatarVariants {
  src?: string;
  alt?: string;
  name?: string;
}

const StyledAvatar = styled("div", avatarRecipe);

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, name, size, ...props }, ref) => {
    const [error, setError] = React.useState(false);

    const getInitials = (name: string) => {
      const parts = name.split(" ");
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    };

    return (
      <StyledAvatar ref={ref} size={size} {...props}>
        {src && !error ? (
          <img
            src={src}
            alt={alt || name || "Avatar"}
            onError={() => setError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : name ? (
          <span>{getInitials(name)}</span>
        ) : (
          <User
            size={
              size === "xs"
                ? 12
                : size === "sm"
                  ? 16
                  : size === "md"
                    ? 20
                    : size === "lg"
                      ? 24
                      : 32
            }
          />
        )}
      </StyledAvatar>
    );
  }
);

Avatar.displayName = "Avatar";
