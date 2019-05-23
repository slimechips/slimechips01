const express = require('express');
const router = express.Router();

const url = require('url');
const https = require('https');
const fs = require('fs');

const clientId = "slimechipsuse1a";
const clientSecret = "5-mF2Cjkbtyb8tRzxSbOMNcd";
const appUri = "http://localhost:3000";
const basePath = "sandbox.api.ndi.gov.sg";

/* GET home page. */
router.get('/', (req, res, next) => {

  const data = JSON.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'openid',
    client_notification_token: generateAlphaNum(),
    acr_values: 'mod-mf',
    nonce: generateAlphaNum(),
    display: 'qrcode'
  });

  const options = {
    hostname: basePath,
    port: 443,
    path: '/asp/api/v1/asp/di-auth',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };
  let qrSrc = "";
  const postReq = https.request(options, (res2) => {
    console.log(`Status Code: ${res2.statusCode}`);
    res2.on('data', (d) => {
      process.stdout.write(d);
      if (res2.statusCode != 200) return;
      qrSrc = "data:image/png;base64," + JSON.parse(d.toString('utf8')).qr_code;
      res.render('index', { title: 'Horizon Bank Internet Banking Fund Transfer',
                            qrSrc: qrSrc });
      let authReqId = JSON.parse(d.toString('utf8')).auth_req_id;
      const myPoll = setInterval(() => {
        pollForToken(authReqId);
      }, 5000);
      res.end();
    });
  });
  postReq.on('error', (error) => {
    console.log("Error", error);
  });

  postReq.write(data);
  postReq.end();
});

module.exports = router;

function generateAlphaNum() {
  return Math.random().toString(36).replace('0.', '');
}

function pollForToken(authReqId) {
  const data = JSON.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'direct_invocation_request',
    auth_req_id: authReqId
  });
  const options = {
    hostname: basePath,
    port: 443,
    path: '/asp/api/v1/asp/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const postReq = https.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    let myData;
    res.on('data', (d) => {
      process.stdout.write(d);
      myData = JSON.parse(d.toString('utf8'))
    });
  });

  postReq.on('error', (error) => {
    console.log("Error", error);
  });

  postReq.write(data);
  postReq.end();
}