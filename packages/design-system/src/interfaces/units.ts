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
  padding?: TSpacingSizesTypes;
  margin?: TSpacingSizesTypes;
  p?: TSpacingSizesTypes;
  pt?: TSpacingSizesTypes;
  pb?: TSpacingSizesTypes;
  pr?: TSpacingSizesTypes;
  pl?: TSpacingSizesTypes;
  m?: TSpacingSizesTypes;
  mt?: TSpacingSizesTypes;
  mr?: TSpacingSizesTypes;
  mb?: TSpacingSizesTypes;
  ml?: TSpacingSizesTypes;
};

export type TSpacingSizesTypes = keyof TSpacingSizes;
export type TBorderRadiusTypes = keyof TBorderRadius;
