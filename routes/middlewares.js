const User = require("../server/models").User;
const Post = require("../server/models").Post;

function postOwner(req, res, next) {
  Post.findOne({ where: { id: req.params.id } }).then(post => {
    User.findOne({ where: { email: req.headers.email } }).then(user => {
      if (post.UserId === user.id) {
        next();
      } else {
        res.send("You cannot modify this post!").status(403);
      }
    });
  });
}

module.exports = {
  postOwner: postOwner
};
