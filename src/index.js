import React from 'react';
import { render } from 'react-dom'
import configureStore from "./store";
import Root from './components/root'

import registerServiceWorker from './registerServiceWorker'

let store = configureStore();

render(
    <Root store={store} />, 
    document.getElementById('root')
);
registerServiceWorker();
