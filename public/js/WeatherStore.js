(function() {

  function WeatherStore() {
    this.data = {};

  }

  WeatherStore.prototype.get = function() {
    return (this.data && this.data.response) ? this.data.response : {};
  };

  WeatherStore.prototype.set = function(response) {
    return this.data.response = response;
  };

  WeatherStore.prototype.find = function(query, cb) {
    var data = this.data.response;

    if (query && query.duration) {
      data = data[query.duration].data;
    }

    cb.call(this, data);
  };

  WeatherStore.prototype.findAll = function(cb) {
    cb.call(this, this.data.response);
  };

  window.app = window.app || {};
  window.app.WeatherStore = WeatherStore;

})(window);
