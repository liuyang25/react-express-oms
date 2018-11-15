import * as React from 'react';
import * as ReactDOM from 'react-dom';
import createRouter from './router/router';
import { Provider } from 'mobx-react';
import stores from './stores';
import * as serviceWorker from './serviceWorker'; 
import './index.less';
import './common.less';

ReactDOM.render(
  <Provider {...stores}>
    {createRouter()}
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
