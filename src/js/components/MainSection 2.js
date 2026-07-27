import React from 'react';
import { shape, string } from 'prop-types';
import { connect } from 'react-redux';
import { Jumbotron } from 'react-bootstrap';

import AlertBox from './AlertBox';
import WeatherReport from './WeatherReport';

class MainSection extends React.PureComponent {
	render() {
		const { searchText, result } = this.props.weatherData;
		return (
			<div className="main-section">
				<AlertBox key={Math.round(Math.random() * 10000)} />
				{
					(searchText.length > 0 && result !== null) &&
						<WeatherReport />
				}
				{
					(searchText.length === 0) &&
						<Jumbotron className="about-app">
							<h4>Search for weather forecast for any cities around the world.</h4>
							<div>
								This app can help you get detailed information regarding weather of your city or any other you want to know about.
							</div>
						</Jumbotron>
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		weatherData: state.weatherData
	};
}

MainSection.propTypes = {
	weatherData: shape({
		searchText: string.isRequired
	}).isRequired
};

export default connect(mapStateToProps, null)(MainSection);
