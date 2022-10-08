var express = require('express');
var session = require('express-session');
var Keycloak = require('keycloak-connect');
var cors = require('cors');

var app = express();
app.use(cors());
const keycloak = require('./config/keycloak-config.js').initKeycloak(app);

var testController = require('./controller/test-controller.js');
app.use('/test', testController);

app.get('/secured', keycloak.protect( 'realm:myrole' ), function (req, res) {
  res.setHeader('content-type', 'text/plain');
  res.send('Secret message!');
});

app.get('/public', function (req, res) {
  res.setHeader('content-type', 'text/plain');
  res.send('Public message!');
});

app.get('/', function (req, res) {
  res.send('<html><body><ul><li><a href="/public">Public endpoint</a></li><li><a href="/secured">Secured endpoint</a></li></ul></body></html>');
});

app.listen(3000, function () {
  console.log('Started at port 3000');
});