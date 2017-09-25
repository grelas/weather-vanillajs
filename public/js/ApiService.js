(function() {

  function ApiService(config) {
    var defaults = {
      baseUrl: 'http://localhost:' + app.PORT,
    };
    this.options = Object.assign({}, defaults, config);
    this.url = this.options.baseUrl;
    this.cacheService = new app.CacheService();
  }

  ApiService.prototype.fetch = function(uri, callback) {
    var self = this;
    var url = self.url + uri;
    var cachedResponse = self.cacheService.get(url);

    if (cachedResponse) {
      console.log('retrive from cache', cachedResponse);
      return Promise.resolve(cachedResponse);
    }

    return new Promise(function(resolve, reject) {
      var httpRequest = new XMLHttpRequest();

      httpRequest.open('GET', url);
      httpRequest.responseType = 'json';
      httpRequest.onload = function() {
        self.cacheService.put(
          httpRequest.responseURL,
          httpRequest.response
        );
        resolve(httpRequest.response);
      };
      httpRequest.onerror = function() {
        reject(httpRequest.statusText);
      };
      httpRequest.send();
    });
  };

  window.app = window.app || {};
  window.app.ApiService = ApiService;

})(window);
