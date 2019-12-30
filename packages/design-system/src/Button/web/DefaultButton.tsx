import styled from 'styled-components';
import theme from '../../theme';

export interface IButtonProps {
  full?: boolean;
  secondary?: boolean;
}

const DefaultButton = styled.button<IButtonProps>`
  padding: 15px 55px;
  border: none;
  border-radius: 6px;
  width: ${(props) => (props.full ? '100%' : 'auto')};
  text-align: center;
  font-family: proxima-nova, sans-serif;
  font-size: ${theme.fonts.sizes.body};
  cursor: pointer;

  &:hover {
    box-shadow: ${(props) => (props.secondary ? 'none' : '0px 11px 16px rgba(40, 245, 190, 0.2)')};
    opacity: ${(props) => (props.secondary ? 0.8 : 1)}
  }
`;

export default DefaultButton;
