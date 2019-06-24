
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
// var compression = require('compression')
// console.log(compression)

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
