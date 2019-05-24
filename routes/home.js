const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const authReqId = null;
  if (req.body["auth_req_id"]) {
    authReqId = req.body["auth_req_id"]
    console.log("Login success");
  }
});
module.exports = router;