# Weather Forecast
App that shows summary, current temperature, max day temperature and min day temperature based on your location or a city of your choosing. Future plans are to add 5 day forecast and hourly forecast.
The app is powered by Dark Sky api.


Features
--------

- Uses HTML5 geolocating and Google geocode api to determine your current location
- Uses Dark Sky weather api to show you weather data of your current location or of the location you enter in the search menu
- Weather data that is shown is: summary, current temperature, max and min temperatures
- 5 day weather forecast (not currently implemented)
- hourly forecast (not currently implemented)


# Changelog
Any significant changes to this project will be documented in this file.

Format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.0]
### Added
- New set of icons for different weather status
- Google Geocode api for finding correct City Name based on your location
- JavaScript code to change background gradient in comparison to time of day or weather condition

### Changed
- CSS design of the app
- Changed standard background in favor of gradient backgrounds
- CSS design is now optimized for mobile use

### Removed
- Openweather api because it wasn't up to the task for current and future plans for the app
