const express = require("express");
const router = express.Router();
const User = require("../server/models").User;

// create user
router.post("/new", (req, res) => {
  const user = req.body;

  User.findOrCreate({ where: { email: user.email }, defaults: user })
    .spread((user, created) => {
      if (!created) {
        res
          .send("This email address is already used! Try to login!")
          .status(403);
      } else {
        res.send(user).status(201);
      }
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

// get user
router.get("/:id", (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => {
      res.send(user).status(200);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

// update user
router.put("/update/:id", (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => {
      user.update(req.body.user).then(() => {
        res.sendStatus(200);
      });
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

// delete user
router.delete("/:id", (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => {
      user.destroy().then(() => {
        res.sendStatus(200);
      });
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

module.exports = router;
