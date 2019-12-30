export interface IFlexProps {
    justify?: 'center' | 'flex-start' | 'space-between' | 'flex-end';
    align?: 'center' | 'flex-start' | 'space-between' | 'flex-end' | 'stretch';
    direction?: 'row' | 'column';
}
export declare const Flex: import("styled-components").StyledComponent<"div", any, IFlexProps, never>;
