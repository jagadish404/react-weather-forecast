import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { CSSTransition } from 'react-transition-group';
import { IForecastHour } from '../types';

interface DailyForecastProps {
  forecastHour: IForecastHour;
  counter: number;
}

const DailyForecast: React.FC<DailyForecastProps> = ({ forecastHour, counter }) => {
  const [show, setShow] = useState(false);
  const { dt_txt: dateText, weather, clouds, main, wind } = forecastHour;
  const weatherIconURL = 'https://openweathermap.org/img/w/';
  const timeout = counter * 100 + 500;

  const nodeRef = useRef(null);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <CSSTransition in={show} timeout={timeout} nodeRef={nodeRef} unmountOnExit>
      {(state) => (
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
    </CSSTransition>
  );
};

export default DailyForecast;
