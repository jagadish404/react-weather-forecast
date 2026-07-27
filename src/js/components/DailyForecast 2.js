import React from 'react';
import moment from 'moment';
import { Transition } from 'react-transition-group';
import { number } from 'prop-types';

import { forecastHourType } from '../types';

class DailyForeacast extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false
		};
	}

	componentDidMount() {
		this.setState(state => ({
			show: !state.show
		}));
	}

	render() {
		const {
			dt_txt: dateText, weather, clouds, main, wind
		} = this.props.forecastHour;
		const { counter } = this.props;
		const { show } = this.state;
		const weatherIconURL = 'https://openweathermap.org/img/w/';
		const timeout = (counter * 100) + 500;

		return (
			<Transition in={show} timeout={timeout}>
				{state => (
					<div className={`forecast-hourly grid forecast-hourly-${state}`}>
						<div className="row">
							<div className="col-xs-3">
								<span>{moment(dateText).format('HH:mm')}</span>
								<img
									src={`${weatherIconURL}${weather[0].icon}.png`}
									className="weather-icon scale-animate"
									alt={weather[0].description}
								/>
							</div>
							<div className="col-xs-9">
								<div>
									<span className="badge">{Math.floor(main.temp)}&deg;C</span>
									<span> {weather[0].description}</span>
								</div>
								<div>
									<span>Wind:{wind.speed}m/s</span>
									<span> Clouds:{clouds.all}%</span>
								</div>
							</div>
						</div>
					</div>
				)}
			</Transition>
		);
	}
}

DailyForeacast.propTypes = {
	forecastHour: forecastHourType.isRequired,
	counter: number.isRequired
};

export default DailyForeacast;
