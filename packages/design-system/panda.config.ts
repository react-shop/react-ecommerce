import { defineConfig } from "@pandacss/dev";
import { colors, spacing } from "./src/theme/tokens";

export default defineConfig({
  // Where to look for your CSS declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Output directory for generated files
  outdir: "styled-system",

  // Enable JSX style props
  jsxFramework: "react",

  // Theme configuration
  theme: {
    extend: {
      breakpoints: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      tokens: {
        colors,
        fonts: {
          heading: { value: "var(--font-heading), system-ui, sans-serif" },
          body: { value: "var(--font-body), system-ui, sans-serif" },
          mono: { value: "ui-monospace, monospace" },
        },
        fontSizes: {
          xs: { value: "0.75rem" },
          sm: { value: "0.875rem" },
          md: { value: "1rem" },
          lg: { value: "1.125rem" },
          xl: { value: "1.25rem" },
          "2xl": { value: "1.5rem" },
          "3xl": { value: "1.875rem" },
          "4xl": { value: "2.25rem" },
          "5xl": { value: "3rem" },
          "6xl": { value: "3.75rem" },
          "7xl": { value: "4.5rem" },
        },
        fontWeights: {
          light: { value: "300" },
          normal: { value: "400" },
          medium: { value: "500" },
          semibold: { value: "600" },
          bold: { value: "700" },
          extrabold: { value: "800" },
        },
        lineHeights: {
          none: { value: "1" },
          tight: { value: "1.25" },
          snug: { value: "1.375" },
          normal: { value: "1.5" },
          relaxed: { value: "1.625" },
          loose: { value: "2" },
        },
        spacing,
        radii: {
          none: { value: "0" },
          sm: { value: "0.125rem" },
          base: { value: "0.25rem" },
          md: { value: "0.375rem" },
          lg: { value: "0.5rem" },
          xl: { value: "0.75rem" },
          "2xl": { value: "1rem" },
          "3xl": { value: "1.5rem" },
          full: { value: "9999px" },
        },
        shadows: {
          xs: { value: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
          sm: {
            value:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          },
          md: {
            value:
              "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          },
          lg: {
            value:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          },
          xl: {
            value:
              "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
          },
          "2xl": { value: "0 25px 50px -12px rgb(0 0 0 / 0.25)" },
          inner: { value: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)" },
        },
        zIndex: {
          hide: { value: "-1" },
          base: { value: "0" },
          docked: { value: "10" },
          dropdown: { value: "1000" },
          sticky: { value: "1100" },
          banner: { value: "1200" },
          overlay: { value: "1300" },
          modal: { value: "1400" },
          popover: { value: "1500" },
          toast: { value: "1600" },
          tooltip: { value: "1700" },
        },
      },
      semanticTokens: {
        colors: {
          // Semantic color tokens for theming
          bg: {
            canvas: {
              value: {
                base: "{colors.neutral.50}",
                _dark: "{colors.neutral.950}",
              },
            },
            surface: {
              value: { base: "white", _dark: "{colors.neutral.900}" },
            },
            muted: {
              value: {
                base: "{colors.neutral.100}",
                _dark: "{colors.neutral.800}",
              },
            },
            subtle: {
              value: {
                base: "{colors.neutral.200}",
                _dark: "{colors.neutral.700}",
              },
            },
          },
          text: {
            primary: {
              value: {
                base: "{colors.neutral.900}",
                _dark: "{colors.neutral.50}",
              },
            },
            secondary: {
              value: {
                base: "{colors.neutral.600}",
                _dark: "{colors.neutral.400}",
              },
            },
            tertiary: {
              value: {
                base: "{colors.neutral.500}",
                _dark: "{colors.neutral.500}",
              },
            },
            inverse: {
              value: { base: "white", _dark: "{colors.neutral.900}" },
            },
          },
          border: {
            default: {
              value: {
                base: "{colors.neutral.200}",
                _dark: "{colors.neutral.700}",
              },
            },
            muted: {
              value: {
                base: "{colors.neutral.100}",
                _dark: "{colors.neutral.800}",
              },
            },
            emphasis: {
              value: {
                base: "{colors.neutral.300}",
                _dark: "{colors.neutral.600}",
              },
            },
          },
          primary: {
            default: {
              value: {
                base: "{colors.brand.600}",
                _dark: "{colors.brand.500}",
              },
            },
            emphasis: {
              value: {
                base: "{colors.brand.700}",
                _dark: "{colors.brand.400}",
              },
            },
            text: {
              value: "white",
            },
          },
        },
      },
    },
  },

  // Conditions for responsive design and color modes
  conditions: {
    extend: {
      light: '[data-theme="light"] &',
      dark: '[data-theme="dark"] &',
    },
  },

  // Global CSS
  globalCss: {
    body: {
      fontFamily: "body",
      bg: "bg.canvas",
      color: "text.primary",
    },
  },

  // Patterns for common layout patterns
  patterns: {
    extend: {
      container: {
        description: "A container that centers content and applies padding",
        properties: {
          maxWidth: { type: "property", value: "maxWidth" },
        },
        transform(props: any) {
          return {
            maxWidth: props.maxWidth || "1280px",
            mx: "auto",
            px: { base: "4", md: "6", lg: "8" },
            width: "100%",
          };
        },
      },
    },
  },

  // Utilities
  utilities: {
    extend: {
      truncate: {
        className: "truncate",
        values: { type: "boolean" },
        transform: (value: boolean) => {
          if (!value) return {};
          return {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          };
        },
      },
    },
  },
});
