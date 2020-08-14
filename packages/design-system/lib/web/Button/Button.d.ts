import { FunctionComponent, MouseEvent, ReactNode } from 'react';
declare type Props = {
    /**
     * Component to be rendered
     */
    children: ReactNode;
    /**
     * Set this if you want a transparent bg button
     */
    outline?: boolean;
    /**
     * Full width button
     */
    full?: boolean;
    /**
     * Button variant
     */
    secondary?: boolean;
    /**
     * onClick event, that inherits the onClick from React Event
     */
    onClick: (e: MouseEvent) => void;
};
declare const Button: FunctionComponent<Props>;
export default Button;
