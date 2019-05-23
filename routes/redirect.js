const express = require('express');
const router = express.Router();

const url = require('url');
const https = require('https');

const clientId = "slimechipsuse1a";
const clientSecret = "5-mF2Cjkbtyb8tRzxSbOMNcd";
const appUri = "http://localhost:3000";
const basePath = "https://sandbox.api.ndi.gov.sg";
  
// GET Redirect
router.get('/', (req, res) => {
//   const q = url.parse(req.url);
//   const state = generateAlphaNum();
//   const nonce = generateAlphaNum();
//   const clientNotificationToken = generateAlphaNum();
//   res.writeHead(302, { Location: 
//     `${basePath}/asp/api/v1/asp/di-auth`
//     `?client_id=${clientId}`
//     `&client_secret=${clientSecret}`
//     `&scope=openid`
//     `&client_notification_token=${clientNotificationToken}`
//     `&acr_values=mod-mf`
//     `&nonce=${nonce}`
//     `&display=qr-code`});
  
});

module.exports = router;

function generateAlphaNum() {
    return Math.random().toString(36).replace('0.', '');
  }