import { TColorsTypes } from '../../../interfaces';

export type TButtonVariants = 'primary' | 'secondary'

export type TDefaultButtonProps = {
  text: string;
  onClick: () => void;
  variant: TButtonVariants;
}

export type TContainerStyleProps = {
  width: number;
  height: number;
  bg: TColorsTypes;
  hoverColor: TColorsTypes;
  border: string;
}

export type TGetVariants = {
  primary: {
    bg: TColorsTypes;
    hoverColor: TColorsTypes;
  };
  secondary: {
    bg: TColorsTypes;
    hoverColor: TColorsTypes;
  };

}
