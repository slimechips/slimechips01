const express = require('express');
const router = express.Router();
const mcache = require('memory-cache');
const url = require('url');

router.post('/', (req, res) => {
  let authReqId = null,
    accessToken = null,
    duration = null;
  console.log("posted" + req.body);
  if (req.body["auth_req_id"]) {
    authReqId = req.body["auth_req_id"];
    accessToken = req.body["access_token"];
    duration = req.body["expires_in"];
    console.log("Login success");

    mcache.put(authReqId, accessToken, duration);
  }
});

router.post('/poll', (req, res) => {
  
  const myPromise = new Promise((resolve, reject) => {
    const MAX_POLL_COUNT = 20;
    let currentPollCount = 0;
    setInterval(() => {
      let authReqId = url.parse(req.url).query["auth_req_id"];
      if (!authReqId) return;
      let accessToken = mcache.get(authReqId);
  
      if (!accessToken) {
        console.log(`Invalid token`);
        ++currentPollCount;
      }
      else {
        resolve(accessToken);
      }

      if (currentPollCount >= MAX_POLL_COUNT) {
        console.log("ending poll");
        reject("Ending Poll");
      }
    }, 3000);
  });

  myPromise.then((accessToken) => {
    res.send({ access_token: accessToken });
    res.end();
  }, 
  (error) => {
    res.end();
  });
});

module.exports = router;