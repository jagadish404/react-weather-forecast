import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Header from './Header';
import MainSection from './MainSection';
import Footer from './Footer';

describe('App component', () => {
	describe('Number of children components', () => {
		it('should have 3 children', () => {
			const app = shallow(<App />);
			expect(app.children()).toHaveLength(3);
		});
	});

	describe('Heade r', () => {
		it('should render Header', () => {
			const app = shallow(<App />);
			expect(app.contains(<Header />)).toBe(true);
		});
	});

	describe('Mainsection', () => {
		it('should render MainSection', () => {
			const output = shallow(<App />);
			expect(output.contains(<MainSection />)).toBe(true);
		});
	});

	describe('Footer', () => {
		it('should render Footer', () => {
			const output = shallow(<App />);
			expect(output.contains(<Footer />)).toBe(true);
		});
	});
});
