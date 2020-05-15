import styled from 'styled-components';

import DefaultButton from './DefaultButton';

const OutlinedButton = styled(DefaultButton)`
  border: 1px solid ${({ secondary, theme }) => (secondary ? theme.colors.secondary : theme.colors.primary)};
  color: ${({ secondary, theme }) => (secondary ? theme.colors.secondary : theme.colors.primary)};
  font-weight: ${theme.fonts.weight.semiBold};
  background-color: transparent;

  &:hover {
    background-color: ${({ secondary, theme }) => (secondary ? theme.colors.secondary : theme.colors.primary)};
    color: ${({ secondary, theme }) => (secondary ? theme.colors.white : theme.colors.black)};
  }
`;

export default OutlinedButton;
