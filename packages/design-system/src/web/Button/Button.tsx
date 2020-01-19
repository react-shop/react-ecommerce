import React, {FunctionComponent, MouseEvent, ReactNode} from 'react';
import StyledButton from './StyledButton';
import OutlinedButton from './OutlinedButton';

type Props = {
  /**
   * Component to be rendered
   */
  children: ReactNode;
  /**
   * Set this if you want a transparent bg button
   */
  outline?: boolean;
  /**
   * Full width button
   */
  full?: boolean;
  /**
   * Button variant
   */
  secondary?: boolean;
  /**
   * onClick event, that inherits the onClick from React Event
   */
  onClick: (e: MouseEvent) => void;
};

export const Button: FunctionComponent<Props> = ({
  children,
  outline = false,
  full = false,
  secondary = false,
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
