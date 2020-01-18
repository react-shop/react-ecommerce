import {configure, addParameters, addDecorator} from '@storybook/react';
import {themes} from '@storybook/theming';
import {withA11y} from '@storybook/addon-a11y';
import '@storybook/addon-console';
import {DocsPage, DocsContainer} from '@storybook/addon-docs/blocks';

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

addDecorator(withA11y);

configure(() => {
  req.keys().forEach(filename => req(filename));
}, module);
