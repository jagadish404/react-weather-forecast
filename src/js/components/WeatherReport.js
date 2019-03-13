import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { string } from 'prop-types';

import DailyForeacast from './DailyForecast';
import { forecastType } from '../types';

class WeatherReport extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			daySelected: this.props.daySelected
		};
	}

	selectDay(forecastDate) {
		this.setState({
			daySelected: forecastDate
		});
	}

	render() {
		const { result, searchText } = this.props;
		const { list } = result;
		const { daySelected } = this.state;
		const forecastDuration = Object.keys(list);
		const todayForecast = list[daySelected];

		return (
			<React.Fragment>
				<h4>Current weather forecast in <i>{searchText}</i></h4>
				<ul className="nav nav-tabs">
					{
						forecastDuration.map(forecastDate => (
							<li
								className={`daily-forecast ${daySelected === forecastDate ? 'active' : ''}`}
								key={forecastDate}
								onClick={this.selectDay.bind(this, forecastDate)}
							>
								{
									moment(forecastDate).isSame(moment(), 'day')
										? 'Today'
										: moment(forecastDate).format('ddd, MMM DD')
								}
							</li>
						))
					}
				</ul>
				<div>
					{
						todayForecast.map((forecastHour, index) => (
							<DailyForeacast
								key={forecastHour.dt_txt}
								forecastHour={forecastHour}
								counter={index + 1}
							/>
						))
					}
				</div>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		result: state.weatherData.result,
		searchText: state.weatherData.searchText,
		daySelected: state.weatherData.daySelected
	};
}

WeatherReport.propTypes = {
	searchText: string.isRequired,
	result: forecastType.isRequired,
	daySelected: string.isRequired
};

export default connect(mapStateToProps, null)(WeatherReport);
