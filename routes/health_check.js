const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/ping', (req, res) => {
  res.send(200);
});

module.exports = router;
