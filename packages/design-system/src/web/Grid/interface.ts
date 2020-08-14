import {
  TColorsTypes,
  TBorderRadiusTypes,
  TCommonSpacingProps,
  TAlignContent,
  TAlignItems,
  TAligns,
  TJustifyContent,
  TSizes,
  TPosition,
  TFlexDirection,
  TFlexWrap,
} from '../../interfaces';


export type TGridProps =
TCommonSpacingProps & {
  bg?: TColorsTypes;
  alignContent?: TAlignContent;
  alignItems?: TAlignItems;
  alignSelf?: TAligns;
  borderRadius?: TBorderRadiusTypes;
  flex?: number;
  flexDirection?: TFlexDirection;
  flexWrap?: TFlexWrap;
  height?: TSizes;
  justifyContent?: TJustifyContent;
  opacity?: number;
  position?: TPosition;
  bottom?: string;
  top?: string;
  left?: string;
  right?: string;
  width?: TSizes;
  zIndex?: number;
  skeleton?: boolean;
  skeletonWidth?: number;
  skeletonHeight?: number;
  display: string;
};
