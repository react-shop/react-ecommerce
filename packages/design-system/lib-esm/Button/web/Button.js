import React from 'react';
import StyledButton from './StyledButton';
import OutlinedButton from './OutlinedButton';
export const Button = ({ children, outline, full, secondary, }) => (React.createElement(React.Fragment, null, outline ? React.createElement(OutlinedButton, { full: full, secondary: secondary }, children) : React.createElement(StyledButton, { full: full, secondary: secondary }, children)));
