(function() {

  function WeatherView() {
    this.$elements = this.cacheDomSelectors();
  }

  WeatherView.prototype.cacheDomSelectors = function() {
    return {
      $app: qs('.app'),
      $main: qs('.content'),
      $body: qs('body'),
      $error: qs('.error'),
      $header: qs('.header'),
      $loader: qs('.loader'),
      $weekly: qs('.weekly-forecast'),
      $hourly: qs('.hourly-forecast')
    };
  };

  WeatherView.prototype.render = function(event, data) {
    var self = this;
    self.$elements.$body.classList.add('is-ready');

    if (event === 'dayToggle') {
      var forecastComponent = new app.ForecastComponent(data, self.$elements);
      self.$elements.$main.innerHTML = forecastComponent.render();
    } else if (event === 'showWeeklyForecast') {
      var weeklySummary = new app.WeeklySummary(data);
      self.$elements.$weekly.innerHTML = weeklySummary.render();
    } else if (event === 'showHourlyForecast') {
      var forecastDetails = new app.ForecastDetailsComponent(data);
      self.$elements.$hourly.innerHTML = forecastDetails.render();
    }
  };

  WeatherView.prototype.bind = function(event, handler) {
    var self = this;
    if (event === 'dayToggle') {
      $delegate(self.$elements.$weekly, '.forecast-item', 'click', function() {
        console.log(this);
        handler({
          time: parseInt(this.getAttribute('data-time'), 10)
        });
      });
    }
  };

  window.app = window.app || {};
  window.app.WeatherView = WeatherView;

})(window);
