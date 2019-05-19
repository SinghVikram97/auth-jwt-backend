const router = require("express").Router();
const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

getAuthTokenId = () => {
  return "Hi";
};

const signToken = email => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, "JWT_SECRET");
};
const createSession = user => {
  // JWT Token and return user data
  const { email, user_id } = user;
  const token = signToken(email);
  return { success: true, user_id: user_id, token: token };
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
        const data = createSession(user);
        res.send(data);
      } else {
        res.send({ success: false });
      }
    });
  });
});

module.exports = router;
