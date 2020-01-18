import styled from 'styled-components';

export interface IFlexProps {
  justify?: 'center' | 'flex-start' | 'space-between' | 'flex-end';
  align?: 'center' | 'flex-start' | 'space-between' | 'flex-end' | 'stretch';
  direction?: 'row' | 'column';
}

export const Flex = styled.div<IFlexProps>`
  display: 'flex';
  direction: ${(props) => (props.direction ? props.direction : 'row')};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
`;
