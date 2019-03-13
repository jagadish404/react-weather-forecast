import { shape, string, number, arrayOf } from 'prop-types';

const weatherType = shape({
	id: number.isRequired,
	cod: number.isRequired,
	name: string.isRequired,
	coord: shape({
		lat: number.isRequired,
		lon: number.isRequired
	}),
	main: shape({
		humidity: number.isRequired,
		pressure: number.isRequired,
		temp: number.isRequired,
		temp_max: number.isRequired,
		temp_min: number.isRequired
	}),
	visibility: number.isRequired,
	weather: arrayOf(shape({
		description: string.isRequired,
		icon: string.isRequired,
		id: number.isRequired,
		main: string.isRequired
	})),
	wind: shape({
		deg: number.isRequired,
		speed: number.isRequired
	})
});

const coOrdType = shape({
	lat: number.isRequired,
	lon: number.isRequired
}).isRequired;

const forecastHourType = shape({
	clouds: shape({
		all: number.isRequired
	}),
	dt: number.isRequired,
	dt_txt: string.isRequired,
	main: shape({
		humidity: number.isRequired,
		pressure: number.isRequired,
		temp: number.isRequired,
		temp_max: number.isRequired,
		temp_min: number.isRequired
	}),
	weather: arrayOf(shape({
		description: string.isRequired,
		icon: string.isRequired,
		id: number.isRequired,
		main: string.isRequired
	})),
	wind: shape({
		deg: number.isRequired,
		speed: number.isRequired
	})
});

const forecastType = shape({
	city: shape({
		coord: coOrdType,
		country: string,
		name: string
	}).isRequired,
	cnt: number.isRequired,
	list: shape({
		[string]: arrayOf(forecastHourType)
	})
});

export { weatherType, forecastType, forecastHourType };
