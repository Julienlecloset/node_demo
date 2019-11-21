const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  axios
    .get("https://jsonplaceholder.typicode.com/todos/1", {})
    .then(response => {
      console.log(response);
      res.send(response.data).status(200);
    });
});

module.exports = router;
