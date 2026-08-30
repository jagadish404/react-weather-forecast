import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';

export function renderWithProviders(component: React.ReactNode, storeOverride = store) {
  return render(<Provider store={storeOverride}>{component}</Provider>);
}
