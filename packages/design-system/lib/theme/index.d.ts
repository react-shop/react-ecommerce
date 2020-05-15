import { DefaultTheme } from 'styled-components/native';
import { TColors, TSpacingSizes, TBorderRadius } from '../interfaces';
declare module 'styled-components' {
    interface DefaultTheme {
        colors: TColors;
        space: TSpacingSizes;
        radii: TBorderRadius;
    }
}
export declare const theme: DefaultTheme;
