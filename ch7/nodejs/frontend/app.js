var express = require('express');
var session = require('express-session');
var Keycloak = require('keycloak-connect');
var sslRootCAs = require('ssl-root-cas');
var cors = require('cors');

var app = express();

app.use(cors());

var memoryStore = new session.MemoryStore();

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

sslRootCAs.inject().addFile(__dirname+'/certs/Masales-RootCA.crt');

var keycloak = new Keycloak({ store: memoryStore });

app.use(keycloak.middleware());

app.get('/', keycloak.checkSso(), function (req, res) {
    res.setHeader('content-type', 'text/plain');
    res.send('Welcome!');
});

app.listen(8080, function () {
    console.log('Started at port 8080');
});