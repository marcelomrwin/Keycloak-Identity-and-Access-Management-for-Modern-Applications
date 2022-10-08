var session = require('express-session');
var Keycloak = require('keycloak-connect');

let _keycloak;

var keycloakConfig = {    
    realm: 'myrealm',
    resource: 'oauth-backend',
    clientId: "oauth-playground",
    bearerOnly: true,
    serverUrl: "${env.KC_URL:https://mykeycloak.masales.lab:8543}",
    confidentialPort: 0,
    verifyTokenAudience: true,
    realmPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz4ZRgIJHFVW8jDWyyHz7HVz1QYAELwYXbTOj1Fa03dyC2xAypnZfArwpoplC0oIBEG8K3fe6dfms/UAKCFsMfPt5anoImSp8/PQNAhQz1l85O5XktMLCBeaKxjpM+oxCPPjDhqWKizIo4bBU3lfhDr3GnWZlri87Ae2K0DpOKRAnTPNGOd7Mum5TsC3/o4OwJ4vuhERq2CBImuC1kBiIHcUD7sZpdljosM3DkHRJRANRcU4XASGs+M6m+N4G+mjQ5I209F0wk5cPyUpin6E5dII2KE7PNlZrBPBaU2s9p9PGefbQi6ngBwmerEtBhhJoP6dtXRWkVav2YWcVq0wW7QIDAQAB'
};

function initKeycloak(app) {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    } 
    else {
        console.log("Initializing Keycloak...");        
        var memoryStore = new session.MemoryStore();
        app.use(session({
            secret: 'some secret',
            resave: false,
            saveUninitialized: true,
            store: memoryStore
          }));
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        app.use(_keycloak.middleware());
        return _keycloak;
    }
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    } 
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};