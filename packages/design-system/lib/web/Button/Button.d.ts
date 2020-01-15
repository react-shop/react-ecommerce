import { FunctionComponent, ReactNode } from 'react';
export interface IButton {
    children: ReactNode;
    outline?: boolean;
    full?: boolean;
    secondary?: boolean;
}
export declare const sum: (a: any, b: any) => any;
export declare const Button: FunctionComponent<IButton>;
