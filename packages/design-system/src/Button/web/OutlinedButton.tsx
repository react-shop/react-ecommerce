import styled from 'styled-components';
import theme from '../../theme';

export interface IButtonProps {
  full?: boolean;
}

const OutlinedButton = styled.div<IButtonProps>`
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  width: ${(props) => (props.full ? '100%' : 'auto')}
`;

export default OutlinedButton;
