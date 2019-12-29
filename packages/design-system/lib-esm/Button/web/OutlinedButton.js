import styled from 'styled-components';
import theme from '../../theme';
import DefaultButton from './DefaultButton';
const OutlinedButton = styled(DefaultButton) `
  border: 1px solid ${(props) => (props.secondary ? theme.colors.secondary : theme.colors.primary)};
  color: ${(props) => (props.secondary ? theme.colors.secondary : theme.colors.primary)};
  font-weight: ${theme.fonts.weight.semiBold};

  &:hover {
    background-color: ${(props) => (props.secondary ? theme.colors.secondary : theme.colors.primary)};
    color: ${(props) => (props.secondary ? theme.colors.white : theme.colors.black)};
  }
`;
export default OutlinedButton;
