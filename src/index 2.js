import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './css/styles.css';
import './css/transitions.css';
import App from './js/components/App';
import store from './js/store';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
