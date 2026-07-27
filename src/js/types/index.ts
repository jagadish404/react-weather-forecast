interface ICoord {
  lat: number;
  lon: number;
}

interface IWeatherCondition {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface IMainWeatherData {
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

interface IWind {
  deg: number;
  speed: number;
}

interface IClouds {
  all: number;
}

interface IWeatherData {
  id: number;
  cod: number;
  name: string;
  coord: ICoord;
  main: IMainWeatherData;
  visibility: number;
  weather: IWeatherCondition[];
  wind: IWind;
}

interface IForecastHour {
  clouds: IClouds;
  dt: number;
  dt_txt: string;
  main: IMainWeatherData;
  weather: IWeatherCondition[];
  wind: IWind;
}

interface ICity {
  coord: ICoord;
  country: string;
  name: string;
}

interface IForecast {
  city: ICity;
  cnt: number;
  list: {
    [key: string]: IForecastHour[];
  };
}

export { IWeatherData, IForecast, IForecastHour };
