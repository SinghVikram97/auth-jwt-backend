const router = require("express").Router();
const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redis = require("redis");
const protobuf = require("protobufjs");

// Setup redis
const redisClient = redis.createClient();

getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(400).json("Unauthorized");
    } else {
      return res.json({ id: reply });
    }
  });
};

const signToken = email => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, "JWT_SECRET");
};

const createSession = user => {
  // JWT Token and return user data
  const { email, user_id } = user;
  const token = signToken(email);
  redisClient.set(token, user_id);
  return { success: true, user_id: user_id, token: token };
};

router.post("/", (req, res) => {
  const { email, password } = req.body;

  const { authorization } = req.headers;

  if (authorization) {
    return getAuthTokenId(req, res);
  }

  User.findOne({
    where: {
      email: email
    }
  }).then(user => {
    bcrypt.compare(password, user.password, function(err, result) {
      if (result === true) {
        const data = createSession(user);
        res.json(data);
      } else {
        res.send({ success: false });
      }
    });
  });
});

module.exports = router;
