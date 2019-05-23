const express = require('express')
const router = express.Router();

const bodyParser = require('body-parser');
const url = require('url');
const https = require('https');

const clientId = "slimechipsuse1a";
const clientSecret = "NW8VCO-6VvIYJ6zsVFeLhhgr";
const appUri = "slimechips01.azurewebsites.net";
const host = "sandbox.api.ndi.gov.sg";

router.use(express.json());

// GET Home Page
router.get('/', (req, res) => {
  let q = url.parse(req.url, true);
  console.log("q", q);
  let code = q.query.code;
  console.log("Code", code);

  const data = JSON.stringify({
    code: code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: `${appUri}/home`,
    grant_type: "authorization_code"
  });
  
  const options = {
    hostname: host,
    port: 443,
    path: "/asp/token",
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };
 
  const postReq = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  postReq.on('error', (error) => {
    console.log("Error", error);
  });

  postReq.write(data);
  postReq.end();
});

router.post('/', (req, res) => {
  console.log("test2");
});

module.exports = router;


function handleResponse(statusCode, jsonData) {
  if (statusCode == 200) {
    const accessToken = jsonData["access_token"];
    const idToken = jsonData["id_token"];
    console.log("Access Token", accessToken);
    console.log("Id Token", idToken);
  }
  else if (statusCode == 400) {
    console.log("Bad request, missing parameters");
  }
  else if (statusCode == 404) {
    console.log("Invalid endpoint url");
  }
  else if (statusCode == 500) {
    console.log("Internal Server Error");
  }
}