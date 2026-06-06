const express = require("express");
const router = express.Router();

const {
  getUsers,
  addUser,
  changePassword,
} = require("../controllers/userController");

router.get("/", getUsers);

router.post("/", addUser);

router.put(
  "/change-password",
  changePassword
);

module.exports = router;