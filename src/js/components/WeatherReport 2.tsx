import React, { use, useEffect, useState } from 'react';
import moment from 'moment';
import DailyForeacast from './DailyForecast';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const WeatherReport: React.FC = () => {
  const weatherReport = useSelector((state: RootState) => state.weatherReport);
  const { result, searchText } = weatherReport;

  const [daySelected, setDaySelected] = useState<string | null>(null);
  const [groupedList, setGroupedList] = useState<{ [key: string]: any[] }>({});

  if (!result || !result.list) return null;

  const forecastDuration = Object.keys(groupedList);
  const todayForecast = (daySelected && groupedList[daySelected]) || [];

  const selectDay = (forecastDate: string) => {
    setDaySelected(forecastDate);
  };

  const getGroupedWeatherForecast = () => {
    const groupedWeatherForecast: { [key: string]: any[] } = {};

    result.list.forEach(forecast => {
      const { dt_txt: dateText } = forecast;
      const forecastDate = moment(dateText).format('YYYY-MM-DD');

      groupedWeatherForecast[forecastDate] = [...(groupedWeatherForecast[forecastDate] || []), forecast];
    });
    return groupedWeatherForecast;
  };

  useEffect(
    () => {
      const groupedWeatherForecast = getGroupedWeatherForecast();
      setGroupedList(groupedWeatherForecast);

      if (Object.keys(groupedWeatherForecast).length > 0) {
        setDaySelected(Object.keys(groupedWeatherForecast)[0]);
      }
    },
    [result.list]
  );

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
