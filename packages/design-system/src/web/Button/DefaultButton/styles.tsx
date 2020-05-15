import styled from 'styled-components';
import { color, layout, border } from 'styled-system';

import { TContainerStyleProps } from './interface';

const Container = styled.button<TContainerStyleProps>`
  ${color}
  ${layout}
  ${border}
`;

export default Container;
