import styled from 'styled-components';
import theme from '../../theme';

export interface IButtonProps {
  full?: boolean;
}

const StyledButton = styled.div<IButtonProps>`
  padding: 10px 15px;
  border-radius: 5px;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.black};
  width: ${(props) => (props.full ? '100%' : 'auto')};
  text-align: center;
  font-family: proxima-nova, sans-serif;
  font-weight: ${theme.fonts.weight.black}
`;

export default StyledButton;
