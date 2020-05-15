export type TSpacingSizes = {
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
  xsmall: number;
  small: number;
  medium: number;
  large: number;
  full: number;
}

export type TCommonSpacingProps = {
  padding?: TSpacingSizes;
  margin?: TSpacingSizes;
  p?: TSpacingSizes;
  pt?: TSpacingSizes;
  pb?: TSpacingSizes;
  pr?: TSpacingSizes;
  pl?: TSpacingSizes;
  m?: TSpacingSizes;
  mt?: TSpacingSizes;
  mr?: TSpacingSizes;
  mb?: TSpacingSizes;
  ml?: TSpacingSizes;
};

export type TSpacingSizesTypes = keyof TSpacingSizes;
export type TBorderRadiusTypes = keyof TBorderRadius;
