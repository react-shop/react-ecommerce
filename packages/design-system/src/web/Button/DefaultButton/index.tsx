import React, { FunctionComponent } from 'react';

import Container from './styles';

import { TDefaultButtonProps } from './interface';

const Button: FunctionComponent<TDefaultButtonProps> = ({ text, onClick, bg }) => (
  <Container width={150} height={32} onClick={onClick} bg={bg}>
    {text}
  </Container>
);

export default Button;
