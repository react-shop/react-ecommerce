import React from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs, text, boolean} from '@storybook/addon-knobs';

import {Button} from './Button';
import {Container} from '../Grid';

const buttonText = text('Name', 'Submit');

const stories = storiesOf('Button', module)
  .addParameters({
    component: Button,
  })
  .addDecorator(withKnobs)
  .add('Default Button', () => (
    <Container>
      <Button
        onClick={() => console.log('Hey, you jest clicked me!')}
        outline={boolean('Outline', false)}
        secondary={boolean('Secondary', false)}>
        {buttonText}
      </Button>
    </Container>
  ));
