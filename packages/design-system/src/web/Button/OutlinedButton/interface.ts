import { TColorsTypes } from '../../../interfaces';

export type TDefaultButtonProps = {
  text: string;
  onClick: () => void;
  borderColor: TColorsTypes;
}

export type TContainerStyleProps = {
  width: number;
  height: number;
  borderColor: TColorsTypes;
}
