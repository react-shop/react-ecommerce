import React, { FunctionComponent, ReactNode } from 'react';
import StyledButton from './StyledButton';
import OutlinedButton from './OutlinedButton';

export interface IButton {
  children: ReactNode;
  outline?: boolean;
  full?: boolean;
}

export const Button: FunctionComponent<IButton> = ({
  children,
  outline,
  full,
}) => (
  <>
    {
      outline ? <OutlinedButton full={full}>{children}</OutlinedButton> : <StyledButton full={full}>{children}</StyledButton>
    }
  </>
);
