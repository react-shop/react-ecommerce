import React from 'react';
import { storiesOf } from '@storybook/react';

import { Button } from './Button';
import { Container } from '../../Grid';

const buttonText = 'Submit';

storiesOf('Button', module).add(
  'Default Button',
  () => (
    <Container>
      <Button>{buttonText}</Button>
    </Container>
  ),
).add('Default Button Secondary', () => (
  <Container>
    <Button secondary>{buttonText}</Button>
  </Container>
)).add(
  'Outlined Button',
  () => (
    <Container>
      <Button outline secondary>{buttonText}</Button>
    </Container>
  ),
);
