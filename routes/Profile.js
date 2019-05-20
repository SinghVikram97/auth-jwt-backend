const router = require("express").Router();
const { User } = require("../db/models");

router.get("/:id", (req, res) => {
  const { id } = req.params;

  User.findOne({
    where: {
      user_id: id
    }
  }).then(user => {
    res.json(user);
  });
});

module.exports = router;
