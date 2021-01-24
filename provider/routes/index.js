var express = require('express');
var router = express.Router();

const EXPECTED_PEOPLE_BODY = [
  {
    id: 1,
    name: "John Mackanzie",
    age: 29,
    occupation: 'teacher'
  },
  {
    id: 2,
    name: "Lindsi Mackmend",
    age: 29,
    occupation: 'engineer'
  }
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/person/:id', function(req, res, next) {
  res.json(EXPECTED_PEOPLE_BODY[0]);
});

router.get('/people', function(req, res, next) {
  res.json(EXPECTED_PEOPLE_BODY);
});

module.exports = router;
