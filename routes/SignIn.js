const router = require("express").Router();
const { User } = require("../db/models");
const bcrypt = require("bcrypt");

getAuthTokenId = () => {
  return "Hi";
};

router.post("/", (req, res) => {
  const { email, password } = req.body;

  const { authorization } = req.headers;

  if (authorization) {
    return getAuthTokenId();
  }

  User.findOne({
    where: {
      email: email
    }
  }).then(user => {
    bcrypt.compare(password, user.password, function(err, result) {
      if (result === true) {
        res.send({ success: true });
      } else {
        res.send({ success: false });
      }
    });
  });
});

module.exports = router;
