import React, {FunctionComponent, MouseEvent, ReactNode} from 'react';
import StyledButton from './StyledButton';
import OutlinedButton from './OutlinedButton';

export interface IButton {
  children: ReactNode;
  outline?: boolean;
  full?: boolean;
  secondary?: boolean;
  onClick: (e: MouseEvent) => void;
}

export const Button: FunctionComponent<IButton> = ({
  children,
  outline,
  full,
  secondary,
  onClick,
}) => (
  <>
    {outline ? (
      <OutlinedButton full={full} onClick={onClick} secondary={secondary}>
        {children}
      </OutlinedButton>
    ) : (
      <StyledButton full={full} onClick={onClick} secondary={secondary}>
        {children}
      </StyledButton>
    )}
  </>
);
