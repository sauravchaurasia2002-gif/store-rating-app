const express = require("express");
const router = express.Router();

const {
  getStores,
  addStore,
  getOwnerStore,
  getStoreRatingsByOwner,
} = require("../controllers/storeController");

// Get all stores
router.get("/", getStores);

// Add store
router.post("/", addStore);

// Get store of logged-in owner
router.get(
  "/owner/:ownerId",
  getOwnerStore
);

// Get users who rated owner's store
router.get(
  "/owner-ratings/:ownerId",
  getStoreRatingsByOwner
);

module.exports = router;