import styled from 'styled-components';
import { color, layout, border } from 'styled-system';

import { TContainerStyleProps } from './interface';

const Container = styled.button<TContainerStyleProps>`
  ${color}
  ${layout}
  ${border}

  box-shadow: 0px 10px 12px rgba(0,0,0,0.2);
  background-color: transparent;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark}
  }
`;

export default Container;
