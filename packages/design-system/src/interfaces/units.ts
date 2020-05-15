export type TSizes = {
  spacing1: number;
  spacing2: number;
  spacing4: number;
  spacing8: number;
  spacing10: number;
  spacing12: number;
  spacing16: number;
  spacing18: number;
  spacing20: number;
  spacing24: number;
  spacing32: number;
}

export type TBorderRadius = {
  small: number;
  medium: number;
  large: number;
  full: number;
}

export type TSizesTypes = keyof TSizes;
export type TBorderRadiusTypes = keyof TBorderRadius;
