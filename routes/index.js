const express = require('express');
const router = express.Router();

const clientId = "slimechips01";
const clientSecret = "NW8VCO-6VvIYJ6zsVFeLhhgr";
const appUri = "slimechips01.azurewebsites.net";
const basePath = "https://sandbox.api.ndi.gov.sg";

/* GET login page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Horizontal Bank Internet Banking' });
  
});

// GET Redirect, redirects user to ASP
router.get('/redirectNDI', (req, res) => {
  console.log("Redirecting");
  let state = generateAlphaNum();
  let nonce = generateAlphaNum();
  res.writeHead(302, { Location: 
    `${basePath}/asp/api/v1/asp/auth`
    + `?client_id=${clientId}`
    + "&response_type=code&scope=openid"
    + `&redirect_uri=${appUri}/home`
    + `&state=${state}`
    + `&nonce=${nonce}` });
  res.end();
});


module.exports = router;

function generateAlphaNum() {
  return Math.random().toString(36).replace('0.', '');
}