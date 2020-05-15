import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import DefaultButton from '../DefaultButton';
import { Grid } from '../..';

const buttonText = text('Name', 'Buy');

const stories = storiesOf('Button', module);

stories
  .addParameters({
    component: DefaultButton,
  })
  .addDecorator(withKnobs)
  .add('Default Button', () => (
    <Grid width="100%" justifyContent="center" alignItems="center" display="flex" flex={1}>
      <DefaultButton
        text={buttonText}
        bg="primary"
        onClick={() => console.log('Hey, you jest clicked me!')}
      />
    </Grid>
  ));
