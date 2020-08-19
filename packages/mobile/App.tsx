import React from 'react';

import Routes from './src';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <Routes />
    </>
  );
};

export default App;
