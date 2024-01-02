var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log("sendign data");
  res.send({ Message: "React client connected to the Express server!" });
});

router.post('/', (req, res) => {
  console.log("Server got data: %j", req.body);
});

module.exports = router;
