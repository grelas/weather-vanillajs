(function() {

  var WeatherConfig = {
    degreeSymbol: '&#176;',
    temperatureScale: 'F',
    endpoints: {
      forecast: '/api/forecast'
    }
  };

  window.app = window.app || {};
  window.app.WeatherConfig = WeatherConfig;

})(window);
