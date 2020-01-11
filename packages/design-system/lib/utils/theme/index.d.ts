declare const theme: Readonly<{
    colors: {
        primary: string;
        secondary: string;
        primaryDark: string;
        error: string;
        black: string;
        blackNormal: string;
        blackDark: string;
        blackLight: string;
        white: string;
        gray: string;
    };
    viewports: {
        smartphone: string;
        tablet: string;
        desktop: string;
    };
    fonts: {
        sizes: {
            heading: string;
            subHeading: string;
            body: string;
            text: string;
        };
        weight: {
            thin: number;
            semiBold: number;
            regular: number;
            bold: number;
            black: number;
        };
    };
}>;
export default theme;
