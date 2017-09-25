(function() {

  var weekdaysShort = [
    'Sun',
    'Mon',
    'Tues',
    'Wed',
    'Thur',
    'Fri',
    'Sat'
  ];

  var weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  var Helpers = {
    weekday: function(date, format) {
      var dateInMilliSeconds = date * 1000;
      var _weekdays = format === 'short' ? weekdaysShort : weekdays;
      return _weekdays[new Date(dateInMilliSeconds).getDay()];
    },
    isToday: function(date) {
      var _now = (new Date()).toDateString();
      var _date = (new Date(date * 1000)).toDateString();
      return _now === _date;
    },
    toPercentage: function(num) {
      return num * 100;
    },
    htmlStringToDom: function(htmlString) {
      var wrapper = document.createElement('div');
      wrapper.innerHTML = htmlString;
      return wrapper;
    },
    startOfDay: function(unixSeconds) {
      var unixTimeInSeconds = new Date(unixSeconds * 1000);
      unixTimeInSeconds.setHours(0,0,0,0);
      return unixTimeInSeconds.getTime() / 1000;
    }
  };

  window.app = window.app || {};
  window.app.Helpers = Helpers;

})();
