export type TAligns = 'flex-start' | 'center' | 'flex-end';

export type TAlignItems = TAligns | 'stretch' | 'baseline';

export type TJustifyContent =
  | TAligns
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type TFlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

export type TAlignContent = TAligns | 'space-between' | 'space-around';

export type TFlexWrap = 'nowrap' | 'wrap';

export type TPosition = 'relative' | 'absolute';

export type TSizes = 'auto' | string;
