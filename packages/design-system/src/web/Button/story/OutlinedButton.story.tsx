import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import OutlinedButton from '../OutlinedButton';
import { Grid } from '../..';

const buttonText = text('Name', 'Buy');

const stories = storiesOf('Button', module);

stories
  .addParameters({
    component: OutlinedButton,
  })
  .addDecorator(withKnobs)
  .add('Outlined Button', () => (
    <Grid width="100%" justifyContent="center" alignItems="center" display="flex" flex={1}>
      <OutlinedButton
        text={buttonText}
        borderColor="secondary"
        onClick={() => console.log('Hey, you jest clicked me!')}
      />
    </Grid>
  ));
