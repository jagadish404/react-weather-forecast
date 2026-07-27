import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
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

interface CommonState {
  result: SearchResult | null;
  searchText: string;
  alertText: string;
  alertStyle: string;
  error: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: CommonState = {
  result: null,
  searchText: '',
  alertText: '',
  alertStyle: 'info',
  error: null,
  status: 'idle',
};

// Async thunk for fetching weather details
export const fetchWeatherReport = createAsyncThunk(
  'common/fetchWeatherReport',
  async (searchText: string, { rejectWithValue }) => {
    const reqUrl = `forecast?q=${searchText}&APPID=${process.env.REACT_WEATHER_APP_API_KEY}&units=metric`;
    try {
      const response = await axios.get(reqUrl);
      return { searchResult: response.data, searchText };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || ({ message: 'Error fetching weather' } as any));
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
      state.alertText = '';
      state.alertStyle = 'info';
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherReport.pending, (state) => {
        state.alertText = 'Fetching results...';
        state.alertStyle = 'info';
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchWeatherReport.rejected, (state, action) => {
        state.error = action.payload;
        state.alertText = action.payload?.message || 'Error fetching weather';
        state.result = null;
        state.alertStyle = 'danger';
        state.status = 'failed';
      })
      .addCase(
        fetchWeatherReport.fulfilled,
        (state, action: PayloadAction<{ searchResult: SearchResult; searchText: string }>) => {
          const { cod: statusCode, list: forecastList } = action.payload.searchResult;
          const { searchText } = action.payload;
          const alertStyle = 'danger';
          let alertText = '';

          if (statusCode !== '200') {
            alertText = `No results found for "${searchText}". Try using different city.`;
          }

          state.result = { ...action.payload.searchResult };
          state.searchText = searchText;
          state.alertText = alertText;
          state.alertStyle = alertStyle;
          state.error = null;
          state.status = 'succeeded';
        }
      );
  },
});

export const { clearWeatherReport } = commonSlice.actions;
export default commonSlice.reducer;
