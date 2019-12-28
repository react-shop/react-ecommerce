import React from 'react';
import { storiesOf } from '@storybook/react';

import { Button } from './Button';

const buttonText = 'Submit';

storiesOf('Button', module).add(
  'text test',
  () => (
    <>
      <Button>{buttonText}</Button>
    </>
  ),
);
