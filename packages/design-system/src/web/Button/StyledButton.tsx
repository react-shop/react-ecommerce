import styled from 'styled-components';
import theme from '../../utils/theme';

import DefaultButton from './DefaultButton';

const StyledButton = styled(DefaultButton)`
  background-color: ${(props) => (props.secondary ? theme.colors.secondary : theme.colors.primary)};
  color: ${(props) => (props.secondary ? theme.colors.white : theme.colors.black)};
`;

export default StyledButton;
