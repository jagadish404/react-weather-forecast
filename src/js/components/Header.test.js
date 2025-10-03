import React from 'react';
import { mount } from 'enzyme';
import { Header } from './Header';

const props = {
  fetchWeatherDetails: jest.fn(),
};
const output = mount(<Header {...props} />);

describe('components', () => {
  describe('header block', () => {
    it('should render', () => {
      expect(output.find('header')).toHaveLength(1);
      expect(output.find('header').props().className).toEqual('page-header');

      expect(output.find('div.page-header-name')).toHaveLength(1);
      expect(output.find('div.page-header-name').text()).toEqual('React weather app');
      expect(output.find('input#search-box')).toHaveLength(1);
      expect(output.find('input#search-box').props().className).toEqual('form-control');
      expect(output.find('input#search-box').props().placeholder).toEqual('Type your city name here');
    });
  });

  describe('Input search on change', () => {
    it('should call handleSearchChange', () => {
      const searchBox = output.find('input#search-box');
      const eventData = { target: { value: 'London' } };

      expect(searchBox.type()).toBe('input');
      searchBox.simulate('change', eventData);
      expect(output.instance().state.searchText).toEqual(eventData.target.value);
    });
  });
});
