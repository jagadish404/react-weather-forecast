import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { func } from 'prop-types';
import Autocomplete from 'react-autocomplete';
import { Transition } from 'react-transition-group';
import cities from 'cities.json';

import { fetchWeatherDetails } from '../actions/commonActions';

export class Header extends React.Component {
	constructor() {
		super();
		this.state = {
			searchText: '',
			cities: [],
			show: false
		};
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.getWeather = this.getWeather.bind(this);
		this.clearText = this.clearText.bind(this);
	}

	componentDidMount() {
		this.setState(state => ({
			show: !state.show
		}));
	}

	getWeather() {
		if (this.state.searchText.length > 0) {
			this.props.fetchWeatherDetails(this.state.searchText);
		}
	}

	handleSearchChange(e) {
		let cityList = [];
		const searchText = e.target.value;

		if (searchText.length >= 3) {
			cityList = cities.filter(city => city.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
		}
		this.setState({
			searchText,
			cities: cityList
		});
	}

	clearText() {
		this.setState({
			searchText: ''
		});
	}

	selectCity(value) {
		this.setState({
			searchText: value
		});
		this.props.fetchWeatherDetails(value);
	}

	renderCityDropDown(items) {
		return (<div className="city-dropdown-menu" children={items} />);
	}

	renderCityItem(item, isHighlighted) {
		const {
			name, country, lat, lng
		} = item;

		return (
			<div
				className="city-item"
				key={`${country}_${name}_${lat}_${lng}`}
				style={{ background: isHighlighted ? '#fdefe4' : 'white' }}
			>
				{name}
			</div>
		);
	}

	render() {
		const { show } = this.state;

		return (
			<Transition in={show} timeout={1000}>
				{state => (
					<header className="page-header">
						<div className={`page-header-name page-header-name-${state}`}>
							React weather app
						</div>
						<div id="custom-search-input">
							<div className={`input-group search-input search-input-${state}`}>
								<Autocomplete
									inputProps={{
										placeholder: 'Type your city name here',
										id: 'search-box',
										className: 'form-control'
									}}
									wrapperStyle={{ display: 'block' }}
									getItemValue={item => item.name}
									items={this.state.cities}
									renderMenu={this.renderCityDropDown}
									renderItem={this.renderCityItem}
									value={this.state.searchText}
									onChange={this.handleSearchChange}
									onSelect={this.selectCity.bind(this)}
								/>
								<span className="input-group-btn">
									<button
										className="btn btn-info"
										type="button"
										onClick={this.getWeather}
									>
										<i className="glyphicon glyphicon-search" />
									</button>
									<button
										className="btn btn-info"
										type="button"
										onClick={this.clearText}
									>
										Clear
									</button>
								</span>
							</div>
						</div>
					</header>
				)}
			</Transition>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchWeatherDetails: bindActionCreators(fetchWeatherDetails, dispatch)
	};
}

Header.propTypes = {
	fetchWeatherDetails: func.isRequired
};

export default connect(null, mapDispatchToProps)(Header);
