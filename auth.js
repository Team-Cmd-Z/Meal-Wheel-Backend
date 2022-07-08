'use strict';

const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const clients = jwksClient({
  jwksUri: process.env.JWKS_URI
});

let getKey = (header, callback) => {
  clients.getSigningKey(header.kid, function(key){
    var signingKey = key.publicKey || MediaKeyStatusMap.rsaPublicKey;
    callback(null, signingKey);
  });
};

const verifyUser = (request, callbackFunction) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    jwt.verify(token, getKey, {}, callbackFunction);
  } catch (error) {
    callbackFunction('Not Authorized');
  }
};

module.exports = verifyUser;
