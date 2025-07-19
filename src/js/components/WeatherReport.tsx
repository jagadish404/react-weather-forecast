import React, { useState } from 'react';
import moment from 'moment';
import DailyForeacast from './DailyForecast';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const WeatherReport: React.FC = () => {
  // Get state from weatherReport reducer (assuming state.weatherData)
  const weatherReport = useSelector((state: RootState) => state.weatherReport);
  const { result, searchText, daySelected: daySelectedFromStore } = weatherReport;

  // Local state for selected day
  const [daySelected, setDaySelected] = useState(daySelectedFromStore);

  if (!result || !result.list) return null;

  const { list } = result;
  const forecastDuration = Object.keys(list);
  const todayForecast = list[daySelected] || [];

  const selectDay = (forecastDate: string) => {
    setDaySelected(forecastDate);
  };

  return (
    <React.Fragment>
      <h4>
        Current weather forecast in <i>{searchText}</i>
      </h4>
      <ul className="nav nav-tabs">
        {forecastDuration.map(forecastDate =>
          <li
            className={`daily-forecast ${daySelected === forecastDate ? 'active' : ''}`}
            key={forecastDate}
            onClick={() => selectDay(forecastDate)}
          >
            {moment(forecastDate).isSame(moment(), 'day') ? 'Today' : moment(forecastDate).format('ddd, MMM DD')}
          </li>
        )}
      </ul>
      <div>
        {todayForecast.map((forecastHour: any, index: number) =>
          <DailyForeacast key={forecastHour.dt_txt} forecastHour={forecastHour} counter={index + 1} />
        )}
      </div>
    </React.Fragment>
  );
};

export default WeatherReport;
