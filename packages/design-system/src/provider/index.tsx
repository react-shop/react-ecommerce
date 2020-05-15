import React, { FunctionComponent } from 'react';

import { ThemeProvider } from 'styled-components';

import { theme } from '../theme';

const ContainerTheme: FunctionComponent = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default ContainerTheme;
