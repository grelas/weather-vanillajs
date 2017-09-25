(function() {

  window.$parent = function(element, tagName) {
    if (!element.parentNode) {
      return;
    }
    if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
      return element.parentNode;
    }
    return window.$parent(element.parentNode, tagName);
  };

  // Helpers
  window.qs = function(selector, scope) {
    return (scope || document).querySelector(selector);
  };

  window.qsa = function(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  };

  window.domReady = function(callback) {
    document.addEventListener('DOMContentLoaded', callback);
  };

  window.$on = function(target, type, callback, useCapture) {
    target.addEventListener(type, callback, !!useCapture);
  };

  window.$delegate = function(target, selector, type, handler) {
    function dispatchEvent(event) {
      var targetElement = event.target;
      var potentialElements = window.qsa(selector, target);
      var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

      if (hasMatch) {
        handler.call(targetElement, event);
      }
    }

    // https://developer.mozilla.org/en-US/docs/Web/Events/blur
    var useCapture = type === 'blur' || type === 'focus';

    window.$on(target, type, dispatchEvent, useCapture);
  };

})(window);
