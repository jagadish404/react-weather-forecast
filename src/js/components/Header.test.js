import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import Header from './Header';

const props = {
  fetchWeatherDetails: jest.fn(),
};

function renderHeader() {
  return renderWithProviders(<Header {...props} />);
}

describe('components', () => {
  describe('header block', () => {
    it('should render', async () => {
      const output = renderHeader();
      expect(output.getByRole('banner')).toBeInTheDocument();
      expect(output.getByRole('banner').className).toEqual('page-header');

      expect(output.getByText('React weather app')).toBeInTheDocument();
      const searchBox = await output.findByPlaceholderText('Type your city name here');
      expect(searchBox).toBeInTheDocument();
    });
  });

  describe('Input search on change', () => {
    it('should call handleSearchChange', async () => {
      const output = renderHeader();
      const searchBox = await output.findByPlaceholderText('Type your city name here');
      const eventData = { target: { value: 'London' } };

      expect(searchBox.tagName.toLowerCase()).toBe('input');
      fireEvent.change(searchBox, { target: { value: 'London' } });
      expect(searchBox.value).toEqual(eventData.target.value);
    });
  });
});
