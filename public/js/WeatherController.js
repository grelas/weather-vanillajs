(function() {

  function WeatherController(view, model) {
    var self = this;

    self.view  = view;
    self.model = model;

    self.view.bind('dayToggle', function(data) {
      self.toggleByDay(data.time);
    });
  }

  WeatherController.prototype.fetch = function(coords) {
    var self = this;

    self.model.fetchForecast(coords)
      .then(function(data) {
        self.toggleByDay();
        self.showWeeklyForecast();
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  WeatherController.prototype.toggleByDay = function(time) {
    time = time || Math.round((new Date()).getTime() / 1000);

    var self = this;
    var startOfDay = app.Helpers.startOfDay(time);
    var query = { duration: 'hourly' };

    self.model.read(query, function(response) {
      self.view.render('showHourlyForecast', self.filterHourlyForecast(response, startOfDay));
    });
  };

  WeatherController.prototype.filterHourlyForecast = function(response, dayOf) {
    var hourlyForecastByDay = response.filter(function(item) {
      var itemTime = app.Helpers.startOfDay(item.time);
      return itemTime === dayOf;
    });

    return hourlyForecastByDay;
  };

  WeatherController.prototype.showWeeklyForecast = function() {
    var self = this;

    self.model.read(function(response) {
      self.view.render('showWeeklyForecast', response.daily);
    });
  };

  window.app = window.app || {};
  window.app.WeatherController = WeatherController;

})();
