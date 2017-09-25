(function() {

  function WeeklySummary(weeklyData) {
    var self = this;
    self.weeklyForecast = weeklyData.data;
  }

  WeeklySummary.prototype.render = function() {
    var self = this;

    return `
      <div class="forecasts">
        ${self.weeklyForecast.map(function(item, index) {
          return new app.ForecastItemComponent(item, index).render()
        }).join('')}
      </div>
    `;
  };

  window.app = window.app || {};
  window.app.WeeklySummary = WeeklySummary;

})(window);
