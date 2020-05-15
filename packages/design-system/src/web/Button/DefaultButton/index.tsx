import React, { FunctionComponent } from 'react';

import Container from './styles';

import { TDefaultButtonProps, TGetVariants } from './interface';

const Button: FunctionComponent<TDefaultButtonProps> = ({ text, onClick, variant }) => {
  const getButtonVariants = () => {
    const getVariants: TGetVariants = {
      primary: {
        bg: 'primary',
        hoverColor: 'primaryDark',
      },
      secondary: {
        bg: 'secondary',
        hoverColor: 'secondaryDark',
      },
    };

    return getVariants[variant] || getVariants.primary;
  };

  return (
    <Container
      width={150}
      height={32}
      onClick={onClick}
      bg={getButtonVariants().bg}
      hoverColor={getButtonVariants().hoverColor}
      border="none"
    >
      {text}
    </Container>
  );
};

export default Button;
