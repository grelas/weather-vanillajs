(function() {

  function CacheService(config) {
    this.cache = {
      http: {}
    };
  }

  CacheService.prototype.get = function(key) {
    return this.cache.http[key] || null;
  };

  CacheService.prototype.put = function(key, value) {
    this.cache.http[key] = value;
  };

  window.app = window.app || {};
  window.app.CacheService = CacheService;

})(window);
