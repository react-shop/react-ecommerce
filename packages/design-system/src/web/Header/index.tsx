import React from 'react';

import Grid from '../Grid';

import { THeader } from './interface';

const Header = ({
  buttonItems,
}: THeader) => (
  <Grid
    display="flex"
    flex={1}
    width="100%"
    justifyContent="space-between"
    bg="primary"
    flexDirection="row"
    pl="spacing16"
    pr="spacing16"
    pt="spacing8"
    pb="spacing8"
  >
    <Grid display="flex" flex={1}>
      Logo
    </Grid>
    <Grid display="flex" flex={1} flexDirection="row" justifyContent="center">
      {
        buttonItems.map((item) => (
          <Grid key={item.text} pr="spacing8">
            {item.text}
          </Grid>
        ))
      }
    </Grid>
    <Grid display="flex" flex={1} flexDirection="row" justifyContent="flex-end">
      <Grid pr="spacing8">
        Search Icon
      </Grid>
      <Grid>
        Cart icon
      </Grid>
    </Grid>
  </Grid>
);

export default Header;
