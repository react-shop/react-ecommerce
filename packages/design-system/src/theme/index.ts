import { DefaultTheme } from 'styled-components/native';

import colors from './colors';
import units from './units';

import {
  TColors,
  TSpacingSizes,
  TBorderRadius,
} from '../interfaces';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  export interface DefaultTheme {
    colors: TColors;
    space: TSpacingSizes;
    radii: TBorderRadius;
  }
}

export const theme: DefaultTheme = {
  colors: {
    ...colors,
  },
  space: {
    ...units.sizes,
  },
  radii: {
    ...units.borderRadius,
  },
};
