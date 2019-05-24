const express = require('express');
const router = express.Router();
const mcache = require('memory-cache');

router.post('/', (req, res) => {
  let idToken = null,
    accessToken = null,
    duration = null;
  console.log("posted" + req.body);
  if (req.body["id_token"]) {
    idToken = req.body["id_token"];
    accessToken = req.body["access_token"];
    duration = req.body["expires_in"];
    console.log("Login success");

    mcache.put(idToken, accessToken, duration*1000);
    console.log(`mcache ${mcache}`);
  }
});

router.post('/poll', (req, res) => {
  
  const myPromise = new Promise((resolve, reject) => {
    const MAX_POLL_COUNT = 20;
    let currentPollCount = 0;
    let idToken = req.body["id_token"];
    if (!idToken) return;

    const myInterval = setInterval(() => {
      let accessToken = mcache.get(idToken);
  
      if (!accessToken) {
        console.log(`Invalid token`);
        ++currentPollCount;
      }
      else {
        clearInterval(myInterval);
        resolve(accessToken);
      }

      if (currentPollCount >= MAX_POLL_COUNT) {
        clearInterval(myInterval);
        console.log("ending poll");
        reject("Ending Poll");
      }
    }, 3000);
  });

  myPromise.then((idToken) => {
    res.send({ id_token: idToken });
    res.end();
  }, 
  (error) => {
    res.end();
  });
});

module.exports = router;