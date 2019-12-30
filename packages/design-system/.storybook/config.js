import { configure, addParameters, addDecorator } from '@storybook/react';
import { themes } from '@storybook/theming';
import { withA11y } from '@storybook/addon-a11y';

const req = require.context('../src', true, /\.story\.(ts|tsx)$/);

addDecorator(withA11y);

addParameters({
  options: {
    theme: themes.dark,
  },
});

configure(() => {
  req.keys().forEach(filename => req(filename))
}, module);


