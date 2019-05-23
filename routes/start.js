const express = require('express');
const router = express.Router();

// GET start page

router.get('/', (req, res) => {
  res.end();
});

module.exports = router;
