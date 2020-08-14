import {configure, addParameters, addDecorator} from '@storybook/react';
import {themes} from '@storybook/theming';
import {withA11y} from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import '@storybook/addon-console';

import {DocsPage, DocsContainer} from '@storybook/addon-docs/blocks';

import themeDecorator from "./themeDecorator"

const req = require.context('../src', true, /\.story\.(ts|tsx|mdx)$/);

addParameters({
  options: {
    theme: themes.dark,
  },
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

addDecorator(withKnobs);
addDecorator(withA11y);
addDecorator(themeDecorator);

configure(() => {
  req.keys().forEach(filename => req(filename));
}, module);
