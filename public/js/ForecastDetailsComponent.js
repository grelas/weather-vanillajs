(function() {

  function ForecastDetailsComponent(hourlyData) {
    var self = this;

    self.chart = new app.ForecastChartComponent(hourlyData);
    self.degreeSymbol = app.WeatherConfig.degreeSymbol;
    self.tempScale = app.WeatherConfig.temperatureScale;
    self.state = {
      current: {
        temperature: self.formatTemperature(hourlyData[0].apparentTemperature),
        humidity: Math.round(app.Helpers.toPercentage(hourlyData[0].humidity)),
        precipitation: app.Helpers.toPercentage(hourlyData[0].precipProbability),
        wind: hourlyData[0].windSpeed,
        summary: hourlyData[0].summary
      }
    };
  }

  ForecastDetailsComponent.prototype.formatTemperature = function(temperature) {
    return `${Math.floor(temperature)}`;
  };

  ForecastDetailsComponent.prototype.render = function() {
    var self = this;
    return `
      <div class="header">
        <div class="current-weather">
          <div class="current-weather-summary">
            <div class="current-day">Today</div>
            <div class="current-weather-desc">${self.state.current.summary}</div>
            <h1 class="current-temperature">
              ${self.state.current.temperature}
              <span class="scale">${self.degreeSymbol}${this.tempScale}</span>
            </h1>
          </div>
          <ul class="current-weather-details">
            <li>Precipitation: ${self.state.current.precipitation}%</li>
            <li>Humidity: ${self.state.current.humidity}%</li>
            <li>Wind: ${self.state.current.wind} mph</li>
          </ul>
        </div>
      </div>

      <div class="weather-chart">
        ${self.chart.render()}
      </div>
    `;
  };

  window.app = window.app || {};
  window.app.ForecastDetailsComponent = ForecastDetailsComponent;

})(window);
