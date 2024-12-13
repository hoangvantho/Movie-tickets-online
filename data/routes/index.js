var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
  res.render('Chào mừng bạn đến với bình nguyên vô tận');
});

module.exports = router;

