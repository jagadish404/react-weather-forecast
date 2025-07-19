import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './css/styles.css';
import './css/transitions.css';
import App from './js/components/App';
import store from './js/store';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
