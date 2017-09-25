(function() {

  function ForecastItemComponent(item, index) {
    var self = this;

    this.item = item;
    this.index = index;
    this.degreeSymbol = app.WeatherConfig.degreeSymbol;
    this.icon = (new app.SvgIcon(this.item.icon)).render();
  }

  ForecastItemComponent.prototype.formatDay = function(date) {
    if (app.Helpers.isToday(date)) {
      return 'Today';
    } else {
      return app.Helpers.weekday(this.item.time, 'short');
    }
  };

  ForecastItemComponent.prototype.formatTemperature = function(temperature) {
    return `${Math.floor(temperature)}${this.degreeSymbol}`;
  };

  ForecastItemComponent.prototype.generateId = function(time) {
    return time;
  };

  ForecastItemComponent.prototype.render = function() {
    var className = (app.Helpers.isToday(this.item.time)) ? 'is-active' : '';
    var id = this.generateId(this.item.time);

    return `
      <div class="forecast-item ${className}" data-time="${id}">
        <h3 class="day">${this.formatDay(this.item.time)}</h3>
        <div class="forecast-visual">${this.icon}</div>
        <div class="temperatures">
          <span class="high">
            ${this.formatTemperature(this.item.apparentTemperatureHigh)}
          </span>
          <span class="low">
            ${this.formatTemperature(this.item.apparentTemperatureLow)}
          </span>
        </div>
      </div>`;
  };

  window.app = window.app || {};
  window.app.ForecastItemComponent = ForecastItemComponent;

})(window);
