import axios from 'axios';
import * as types from '../constants/actionTypes';

const API_KEY = '45a29671bd126433901f9f788d0eeff2';
axios.defaults.baseURL = 'http://api.openweathermap.org/data/2.5/';

export function fetchWeatherDetails(cityName) {
	return (dispatch) => {
		dispatch({ type: types.SEARCHING_WEATHER });
		axios.get(`forecast?q=${cityName}&APPID=${API_KEY}&units=metric`)
			.then((response) => {
				dispatch({
					type: types.SEARCH_WEATHER_SUCCESS,
					payload: { searchResult: response.data, searchText: cityName }
				});
			})
			.catch((err) => {
				dispatch({ type: types.SEARCH_WEATHER_REJECTED, payload: err.response.data });
			});
	};
}
