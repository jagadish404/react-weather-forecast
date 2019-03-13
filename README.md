# My Weather App

This is a React based web application which uses 3rd Party API(OpenWeatherMap) to show weather report of next N days to the user based on the location selected.

# Requirements
*  Build a weather component that shows the weather forecast for the next N days for a given city.
*  The UI should have an input box with autocomplete to type the city name in and update the forecast accordingly.
*  Use a third-party API(i.e. OpenWeatherMap or others) to fetch weather data.

### Implementation details of coding challenge
The Frontend challenge to develop weather forecast application have been implemented using below technology stack.
* ReactJS - JavaScript library which helps build Single Page Application with reusable UI component.
* Redux - JavaScript state management library used with React to manage the application state.
* Webpack - Module bundling to bundle assets(JS, CSS, images) into single file and to manage dependencies.
* Webpack dev server - To set up a development server assigned to a port and run the application in local machine.
* Babel - Transpiler to translate ES6 Javascript to ES5 in order to run on browsers which is non compliant with ES6.
* NPM - Node Package Manager to manage dependent packages in the application.
* OpenWeatherMap - Free weather API to fetch information related with weather forecast.
* ReactTransition - JavaScript library to add CSS transition to React components.

## How to run the code challenge

1. Clone the latest code from repository (https://github.com/jagadish404/react-weather-forecast.git)
2. Open command terminal with the root folder of the repository
3. Install the necessary packages first (Make sure you have installed latest node.js on your machine)
4. run webpack-dev-server to start running the app

```bash
npm install
npm run start
```
After running the 2nd command, the app opens on your default browser by itself.
If not then open [`localhost:3000`](http://localhost:3000) in a browser.

A production build is available too which is inside the folder "dist/" within root directory. Kindly use the build if you like to skip the development build

Note: This is a webpack development build which has the debugging, logging enabled. We can also have production build using webpack.