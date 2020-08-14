import React, { FunctionComponent } from 'react';

import Container from './styles';

import { TDefaultButtonProps } from './interface';

const Button: FunctionComponent<TDefaultButtonProps> = ({ text, onClick, borderColor }) => (
  <Container width={150} height={32} onClick={onClick} borderColor={borderColor}>
    {text}
  </Container>
);

export default Button;
