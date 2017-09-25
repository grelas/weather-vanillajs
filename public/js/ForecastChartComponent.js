(function() {

  function ForecastChartComponent(hourlyData) {
    this.data = hourlyData
    this.options = {
      strokeWidth: 2,
      strokeColor: '#fdc839',
      fillColor: 'rgba(255, 204, 0, 0.2)',
      canvasHeight: 110,
      canvasWidth:  600,
      xScale: this.calculateXUnit()
    };
    this.xUnit = this.options.canvasWidth / this.options.xScale;
  }

  ForecastChartComponent.prototype.calculateXUnit = function() {
    var numberOfDays = 1;
    return (this.data.length) / numberOfDays;
  };

  ForecastChartComponent.prototype.generatePath = function() {
    var height = this.options.canvasHeight;
    var commands = [];

    for(var i = 0; i < this.data.length; i++) {
      var xDir = i * this.xUnit;
      var yDir = height - this.data[i].temperature;
      var command = (i === 0) ? 'M' : 'L';
      var value = `${command} ${xDir}, ${yDir}`;

      commands.push(value);
    }

    return commands.join(' ');
  };

  ForecastChartComponent.prototype.render = function() {
    var path = `
      <path stroke="${this.options.strokeColor}"
            stroke-width="${this.options.strokeWidth}",
            fill="${this.options.fillColor}"
            fill-opacity='0'
            d="${this.generatePath()}"/>`;

    return `
      <svg viewbox="0 0 ${this.options.canvasWidth} ${this.options.canvasHeight}"
           xmlns="http://www.w3.org/2000/svg">
        ${path}
      </svg>`;
  };

  window.app = window.app || {};
  window.app.ForecastChartComponent = ForecastChartComponent;

})(window);
