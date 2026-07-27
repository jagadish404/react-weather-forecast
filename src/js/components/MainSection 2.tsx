import React from 'react';

import AlertBox from './AlertBox';
import WeatherReport from './WeatherReport';
import { useAppSelector } from '../hooks';
import { RootState } from '../store';

const MainSection: React.FC = () => {
  const { result, searchText } = useAppSelector((state: RootState) => state.weatherReport);

  return (
    <div className="main-section">
      <AlertBox />
      {searchText.length > 0 && result !== null && <WeatherReport />}
      {searchText.length === 0 &&
        <div className="about-app p-5 mb-4 bg-light border rounded-3">
          <h4>Search for weather forecast for any cities around the world.</h4>
          <div>
            This app can help you get detailed information regarding weather of your city or any other you want to know
            about.
          </div>
        </div>}
    </div>
  );
};

export default MainSection;
