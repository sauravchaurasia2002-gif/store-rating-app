const express = require("express");

const router = express.Router();

const {
  getRatings,
  addRating,
  updateRating,
} = require("../controllers/ratingController");

router.get("/", getRatings);

router.post("/", addRating);

router.put("/", updateRating);

module.exports = router;