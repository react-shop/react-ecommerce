import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';

import DefaultButton from '../DefaultButton';
import { Grid } from '../..';

import { TButtonVariants } from '../DefaultButton/interface';

const stories = storiesOf('Button', module);

stories
  .addParameters({
    component: DefaultButton,
  })
  .add('Default Button', () => {
    const buttonText = text('Name', 'Buy');
    const label = 'Variant';
    const options: TButtonVariants[] = ['primary', 'secondary'];
    const buttonVariant: TButtonVariants = select(label, options, 'primary');

    return (
      <Grid width="100%" justifyContent="center" alignItems="center" display="flex" flex={1}>
        <DefaultButton
          text={buttonText}
          variant={buttonVariant}
          onClick={() => console.log('Hey, you jest clicked me!')}
        />
      </Grid>
    );
  });
