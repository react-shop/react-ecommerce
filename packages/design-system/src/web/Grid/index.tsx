import React, { FunctionComponent } from 'react';

import Container from './styles';

import { TGridProps } from './interface';

// import Skeleton from '../Skeleton';

const Grid: FunctionComponent<TGridProps> = ({
  children,
  skeleton,
  skeletonHeight,
  skeletonWidth,
  ...rest
}) => (
  <Container {...rest}>
    {children}
  </Container>
);

export default Grid;
