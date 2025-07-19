import React from 'react';

import AlertBox from './AlertBox';
import WeatherReport from './WeatherReport';
import { useAppSelector } from '../hooks';
import { RootState } from '../store';

const MainSection: React.FC = () => {
  const { result, status, error, searchText } = useAppSelector((state: RootState) => state.weatherReport);

  if (status === 'loading') {
    return <div className="loading">Loading...</div>;
  }

  if (status === 'failed') {
    return (
      <div className="error">
        {error}
      </div>
    );
  }

  return (
    <div className="main-section">
      <AlertBox />
      {searchText.length > 0 && result !== null && <WeatherReport />}
      {searchText.length === 0 &&
        <div className="about-app p-5 mb-4 bg-light rounded-3">
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
