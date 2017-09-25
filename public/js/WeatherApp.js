(function() {

  function WeatherApp(options) {
    this.view = new app.WeatherView();
    this.storage = new app.WeatherStore();
    this.model = new app.WeatherModel(this.storage);
    this.controller = new app.WeatherController(this.view, this.model);
  }

  domReady(function() {
    var weatherApp = new WeatherApp();
    weatherApp.controller.fetch(app.DEFAULT_CITY.coords);

    // TODO move
    // var weatherSelect = document.querySelector('.select');
    // weatherSelect.addEventListener('change', function(event) {
    //   var coords = JSON.parse(event.target.value).coords;
    //   weatherApp.controller.fetch(coords);
    // });
  });

})(window);
