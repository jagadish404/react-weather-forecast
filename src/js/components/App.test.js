import React from 'react';
import { renderWithProviders } from '../test-utils';
import App from './App';

function renderApp() {
  return renderWithProviders(<App />);
}

describe('App component', () => {
  describe('Number of children components', () => {
    it('should have 3 children', () => {
      const output = renderApp();
      expect(output.container.children).toHaveLength(3);
    });
  });

  describe('Header', () => {
    it('should render Header', async () => {
      const output = renderApp();
      const { findByText } = output;
      expect(await findByText('React weather app')).toBeInTheDocument();
    });
  });

  describe('Main section', () => {
    it('should render MainSection', async () => {
      const output = renderApp();
      const { findByText } = output;
      expect(await findByText('Search for weather forecast for any cities around the world.')).toBeInTheDocument();
    });
  });

  describe('Footer', () => {
    it('should render Footer', async () => {
      const output = renderApp();
      const { findByText } = output;
      expect(await findByText('Developed by: Jagadish')).toBeInTheDocument();
    });
  });
});
