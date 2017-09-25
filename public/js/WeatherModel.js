(function() {

  function WeatherModel(storage) {
    this.apiService = new app.ApiService();
    this.storage = storage;
  }

  WeatherModel.prototype.sanitize = function(response) {
    return response;
  };

  WeatherModel.prototype.fetchForecast = function(coords) {
    var self = this;
    var coords = coords.lat + ',' + coords.long;
    var uri = `${app.WeatherConfig.endpoints.forecast}/${coords}?extend=hourly`;

    return self.apiService.fetch(uri)
      .then(function(data) {
        self.storage.set(self.sanitize(data));
        return data;
      });
  };

  WeatherModel.prototype.read = function(query, cb) {
    var queryType = typeof query;
    var callback = cb || function() {};

    if (queryType === 'function') {
      callback = query;
      return this.storage.findAll(callback);
    } else if (queryType === 'object') {
      this.storage.find(query, cb);
    }
  };

  window.app = window.app || {};
  window.app.WeatherModel = WeatherModel;

})();
