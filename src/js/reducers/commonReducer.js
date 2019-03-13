import moment from 'moment';
import * as types from '../constants/actionTypes';

const initialState = {
	fetching: false,
	showSpinner: false,
	fetched: false,
	result: null,
	searchText: '',
	alertText: '',
	showAlert: false,
	alertStyle: 'info',
	error: null
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case types.SEARCHING_WEATHER: {
			return {
				...state,
				fetching: true,
				alertText: 'Fetching results...',
				alertStyle: 'info',
				showSpinner: true,
				showAlert: true
			};
		}

		case types.SEARCH_WEATHER_REJECTED: {
			return {
				...state,
				fetching: false,
				error: action.payload,
				alertText: action.payload.message,
				result: null,
				showSpinner: false,
				alertStyle: 'danger',
				showAlert: true
			};
		}

		case types.SEARCH_WEATHER_SUCCESS: {
			const { cod: statusCode, list: forecastList } = action.payload.searchResult;
			const { searchText } = action.payload;
			const alertStyle = 'danger';
			const groupedList = {};
			let daySelected = null;
			let alertText = '';
			let showAlert = false;

			if (statusCode !== '200') {
				alertText = `No results found for "${searchText}". Try using different city.`;
				showAlert = true;
			}

			forecastList.forEach((forecast) => {
				const { dt_txt: dateText } = forecast;
				const forecastDate = moment(dateText).format('YYYY-MM-DD');

				if (groupedList[forecastDate] === undefined) {
					groupedList[forecastDate] = [forecast];
				} else {
					groupedList[forecastDate].push(forecast);
				}
			});

			if (Object.keys(groupedList).length > 0) {
				[daySelected] = Object.keys(groupedList);
			}

			return {
				...state,
				fetching: false,
				fetched: true,
				result: { ...action.payload.searchResult, list: groupedList },
				daySelected,
				searchText,
				alertText,
				showSpinner: false,
				alertStyle,
				showAlert
			};
		}

		default: return state;
	}
}
