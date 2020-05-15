import { TColorsTypes } from '../../../interfaces';

export type TDefaultButtonProps = {
  text: string;
  onClick: () => void;
  bg: TColorsTypes;
}

export type TContainerStyleProps = {
  width: number;
  height: number;
  bg: TColorsTypes;
}
