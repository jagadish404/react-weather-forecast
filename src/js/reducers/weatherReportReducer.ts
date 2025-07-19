import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import axios from 'axios';

axios.defaults.baseURL = 'http://api.openweathermap.org/data/2.5/';

interface Forecast {
  dt_txt: string;
  [key: string]: any;
}

interface SearchResult {
  cod: string;
  list: Forecast[];
  [key: string]: any;
}

interface GroupedList {
  [date: string]: Forecast[];
}

interface CommonState {
  fetching: boolean;
  showSpinner: boolean;
  fetched: boolean;
  result: SearchResult | null;
  searchText: string;
  alertText: string;
  showAlert: boolean;
  alertStyle: string;
  error: any;
  daySelected: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: CommonState = {
  fetching: false,
  showSpinner: false,
  fetched: false,
  result: null,
  searchText: '',
  alertText: '',
  showAlert: false,
  alertStyle: 'info',
  error: null,
  daySelected: null,
  status: 'idle',
};

// Async thunk for fetching weather details
export const fetchWeatherReport = createAsyncThunk(
  'common/fetchWeatherReport',
  async (searchText: string, { rejectWithValue }) => {
    const reqUrl = 
    `forecast?q=${searchText}&APPID=${process.env.REACT_WEATHER_APP_API_KEY}&units=metric`
    try {
      const response = await axios.get(reqUrl);
      return { searchResult: response.data, searchText };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: 'Error fetching weather' } as any);
    }
  }
);

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    clearWeatherReport: (state) => {
      state.result = null;
      state.searchText = '';
      state.daySelected = null;
      state.showAlert = false;
      state.alertText = '';
      state.alertStyle = 'info';
      state.showSpinner = false;
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherReport.pending, (state) => {
        state.fetching = true;
        state.alertText = 'Fetching results...';
        state.alertStyle = 'info';
        state.showSpinner = true;
        state.showAlert = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchWeatherReport.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
        state.alertText = action.payload?.message || 'Error fetching weather';
        state.result = null;
        state.showSpinner = false;
        state.alertStyle = 'danger';
        state.showAlert = true;
        state.status = 'failed';
      })
      .addCase(fetchWeatherReport.fulfilled, (state, action: PayloadAction<{ searchResult: SearchResult, searchText: string }>) => {
        const { cod: statusCode, list: forecastList } = action.payload.searchResult;
        console.log('action.payload.searchResult', action.payload.searchResult)
        const { searchText } = action.payload;
        let alertStyle = 'danger';
        const groupedList: GroupedList = {};
        let daySelected: string | null = null;
        let alertText = '';
        let showAlert = false;

        if (statusCode !== '200') {
          alertText = `No results found for "${searchText}". Try using different city.`;
          showAlert = true;
        }

        forecastList.forEach((forecast) => {
          const { dt_txt: dateText } = forecast;
          const forecastDate = moment(dateText).format('YYYY-MM-DD');
          if (!groupedList[forecastDate]) {
            groupedList[forecastDate] = [forecast];
          } else {
            groupedList[forecastDate].push(forecast);
          }
        });

        if (Object.keys(groupedList).length > 0) {
          daySelected = Object.keys(groupedList)[0];
        }

        state.fetching = false;
        state.fetched = true;
        state.result = { ...action.payload.searchResult, list: groupedList };
        state.daySelected = daySelected;
        state.searchText = searchText;
        state.alertText = alertText;
        state.showSpinner = false;
        state.alertStyle = alertStyle;
        state.showAlert = showAlert;
        state.error = null;
        state.status = 'succeeded';
      });
  },
});

export const { clearWeatherReport } = commonSlice.actions;
export default commonSlice.reducer;