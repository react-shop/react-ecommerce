import React from 'react';
import { storiesOf } from '@storybook/react';

import { DefaultButton } from './Button';

const buttonText = 'Submit';

storiesOf('DefaultButton', module).add(
  'text test',
  () => (
    <>
      <DefaultButton>{buttonText}</DefaultButton>
      {' '}
    </>
  ),
);
