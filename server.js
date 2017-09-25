const express = require('express');
const app = express();
const request = require('request-promise');
const morgan = require('morgan');
const config = require('./config.json');

const apiBaseUrl = config.apiBaseUrl
const apiKey = config.apiKey;
const port = 8000;

const cities = [
  {
    name: 'Little Ferry',
    coords: {
      lat: 40.8529,
      long: -74.0421
    },
    default: true
  },
  {
    name: 'Long Island City',
    coords: {
      lat: 40.74482,
      long: -73.948753
    },
    default: false
  }
];


const defaultCity = cities.find(function(city) {
  return city.default === true;
});

const sortBy = (arr, key) => {
  return arr.sort(function(a, b) {
    var x = a[key];
    var y = b[key];

    return ((x < y) ? 1 : ((x > y) ? -1 : 0));
  });
};


app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.use(morgan('dev'));
app.locals.pretty = true;

app.get('/', function (req, res) {
  res.render('index', {
    port: port,
    cities: sortBy(cities, 'default'),
    defaultCity: JSON.stringify(defaultCity)
  });
});

app.get('/api/forecast/:coords', function (req, res) {
  // Prevent throttling
  if (app.get('env') === 'development') {
    return res.status(200).json( require('./fakeResponse') );
  }

  if (!req.params.coords) {
    return res.status(400).json('Something went wrong!');
  }

  return request.get({
    url: apiBaseUrl + '/' + apiKey + '/' + req.params.coords,
    qs: req.query,
    json: true
  })
  .then(function(result) {
    res.status(200).json(result);
  })
  .catch(function(err) {
    res.status(500).json(err);
  })
});

app.get('/api/*', function(req, res, next) {
  res.status(404).json({
    statusCode: 404,
    message: 'Not found'
  });
});

app.listen(port, function () {
  console.log(`Weather app listening on port ${port}!`);
});
