import { FunctionComponent, MouseEvent, ReactNode } from 'react';
export interface IButton {
    children: ReactNode;
    outline?: boolean;
    full?: boolean;
    secondary?: boolean;
    onClick: (e: MouseEvent) => void;
}
export declare const Button: FunctionComponent<IButton>;
