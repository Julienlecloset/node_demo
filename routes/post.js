const express = require("express");
const router = express.Router();
const User = require("../server/models").User;
const Post = require("../server/models").Post;
const postOwner = require("./middlewares").postOwner;

// create post
router.post("/new", (req, res) => {
  Post.create(req.body.post)
    .then(post => {
      res.send(post).status(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

// get post
router.get("/:id", (req, res) => {
  Post.findOne({ where: { id: req.params.id } })
    .then(post => {
      res.send(post).status(200);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

// get a user and all of its post
router.get("/all/:id", (req, res) => {
  User.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Post
      }
    ]
  })
    .then(user => {
      res.json(user.Posts).status(200);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

// update post
router.put("/update/:id", postOwner, (req, res) => {
  Post.findOne({ where: { id: req.params.id } })
    .then(post => {
      post.update(req.body.post).then(() => {
        res.sendStatus(200);
      });
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

// delete post
router.delete("/:id", (req, res) => {
  Post.findOne({ where: { id: req.params.id } })
    .then(post => {
      post.destroy().then(() => {
        res.sendStatus(200);
      });
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

module.exports = router;
