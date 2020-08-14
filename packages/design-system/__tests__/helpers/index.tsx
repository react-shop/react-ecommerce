import {
  mount, shallow, ShallowWrapper, ReactWrapper,
} from 'enzyme';

import { ThemeProvider, DefaultTheme } from 'styled-components';

import React from 'react';

import { theme as designSystemTheme } from '../../src/theme';

export const mountWithTheme = (
  tree: React.ReactElement,
  theme: DefaultTheme = designSystemTheme,
): ReactWrapper => {
  const WrappingThemeProvider: React.FC<{
    children: React.ReactChild;
  }> = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

  return mount(tree, { wrappingComponent: WrappingThemeProvider });
};

export const shallowWithTheme = (
  tree: React.ReactElement,
  theme: DefaultTheme = designSystemTheme,
): ShallowWrapper => {
  const WrappingThemeProvider: React.FC<{
    children: React.ReactChild;
  }> = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

  return shallow(tree, { wrappingComponent: WrappingThemeProvider });
};
