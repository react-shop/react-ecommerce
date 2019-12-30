import { configure, addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';

const req = require.context('../src', true, /\.story\.(ts|tsx)$/);

addParameters({
  options: {
    theme: themes.dark,
  },
});

configure(() => {
  req.keys().forEach(filename => req(filename))
}, module);


