import React, { FunctionComponent, ReactNode } from 'react';
import StyledButton from './StyledButton';
import OutlinedButton from './OutlinedButton';

export interface IDefaultButton {
  children: ReactNode;
  outline?: boolean;
  full?: boolean;
}

export const DefaultButton: FunctionComponent<IDefaultButton> = ({
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
