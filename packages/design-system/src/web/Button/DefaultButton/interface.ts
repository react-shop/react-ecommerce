import { TColorsTypes } from '../../../interfaces';

export type TButtonVariants = 'primary' | 'secondary'

export type TDefaultButtonProps = {
  testID?: string;
  text: string;
  onClick: () => void;
  variant: TButtonVariants;
  disabled?: boolean;
}

export type TContainerStyleProps = {
  testID?: string;
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
  disabled: {
    bg: TColorsTypes;
    hoverColor: TColorsTypes;
  };
}
