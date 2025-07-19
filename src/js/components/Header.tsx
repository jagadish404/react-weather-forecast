import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AutoComplete, Input, Button } from 'antd';
import { CSSTransition } from 'react-transition-group';
import cities from 'cities.json';

import { fetchWeatherDetails } from '../actions/commonActions';
import { fetchWeatherReport, clearWeatherReport } from '../reducers/weatherReportReducer';
import { RootState } from '../store';

// Define the city type based on your cities.json structure
interface City {
  name: string;
  country: string;
  lat: string | number;
  lng: string | number;
}

const Header: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [cityList, setCityList] = useState<{ value: string }[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch();
  const nodeRef = useRef(null);

  useEffect(() => {
    setShow(true);
  }, []);

  const getWeather = useCallback(
    () => {
      if (searchText.length > 0) {
        dispatch(fetchWeatherReport(searchText));
      }
    },
    [dispatch, searchText]
  );

  const handleSearchChange = (value: string) => {
    let filteredCities: { value: string }[] = [];
    if (value.length >= 3) {
      filteredCities = (cities as City[])
        .filter(city => city.name.toLowerCase().includes(value.toLowerCase()))
        .map(city => ({ value: city.name }));
    }
    setSearchText(value);
    setCityList(filteredCities);
  };

  const clearText = () => {
    setSearchText('');
    setCityList([]);
  };

  const selectCity = (value: string) => {
    setSearchText(value);
    dispatch(fetchWeatherReport(value));
  };

  return (
    <CSSTransition nodeRef={nodeRef} in={show} timeout={1000} classNames="page-header" unmountOnExit>
      {state =>
        <header className="page-header">
          <div className={`page-header-name page-header-name-${state}`}>React weather app</div>
          <div id="custom-search-input">
            <div className={`input-group search-input search-input-${state}`}>
              <AutoComplete
                options={cityList}
                value={searchText}
                onSearch={handleSearchChange}
                onSelect={selectCity}
                style={{ width: '100%' }}
              >
                <Input placeholder="Type your city name here" id="search-box" className="form-control" />
              </AutoComplete>
              <span className="input-group-btn">
                <Button className="btn btn-info" type="primary" onClick={getWeather} size="small">
                  <i className="glyphicon glyphicon-search" />
                </Button>
                <Button className="btn btn-info" type="default" onClick={clearText} size="small">
                  Clear
                </Button>
                <Button
                  className="btn btn-info"
                  type="default"
                  size="small"
                  onClick={() => dispatch(clearWeatherReport())}
                >
                  Call reducer
                </Button>
              </span>
            </div>
          </div>
        </header>}
    </CSSTransition>
  );
};

export default Header;
