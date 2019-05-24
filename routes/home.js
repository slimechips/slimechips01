const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  console.log("posted " + req.body);
});
module.exports = router;