import React, { FunctionComponent, ReactNode } from 'react';
import StyledButton from './StyledButton';
import OutlinedButton from './OutlinedButton';

export interface IButton {
  children: ReactNode;
  outline?: boolean;
  full?: boolean;
  secondary?: boolean;
}

export const Button: FunctionComponent<IButton> = ({
  children,
  outline,
  full,
  secondary,
}) => (
  <>
    {
      outline ? <OutlinedButton full={full} secondary={secondary}>{children}</OutlinedButton> : <StyledButton full={full} secondary={secondary}>{children}</StyledButton>
    }
  </>
);
