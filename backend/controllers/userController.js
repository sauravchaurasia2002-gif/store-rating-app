const db = require("../config/db");
const bcrypt = require("bcryptjs");

// Get All Users
const getUsers = (req, res) => {
  const sql = `
    SELECT
      id,
      name,
      email,
      address,
      role
    FROM users
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

// Add User
const addUser = async (req, res) => {
  const {
    name,
    email,
    password,
    address,
    role,
  } = req.body;

  try {
    const hashedPassword =
      await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users
      (
        name,
        email,
        password,
        address,
        role
      )
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        name,
        email,
        hashedPassword,
        address,
        role,
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.status(201).json({
          message:
            "User Added Successfully",
        });
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

// Change Password
const changePassword = async (
  req,
  res
) => {
  const {
    userId,
    oldPassword,
    newPassword,
  } = req.body;

  const sql =
    "SELECT * FROM users WHERE id=?";

  db.query(
    sql,
    [userId],
    async (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const user = result[0];

      const isMatch =
        await bcrypt.compare(
          oldPassword,
          user.password
        );

      if (!isMatch) {
        return res.status(400).json({
          message:
            "Old password is incorrect",
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          newPassword,
          10
        );

      const updateSql =
        "UPDATE users SET password=? WHERE id=?";

      db.query(
        updateSql,
        [hashedPassword, userId],
        (err) => {
          if (err) {
            return res.status(500).json(err);
          }

          res.json({
            message:
              "Password changed successfully",
          });
        }
      );
    }
  );
};

module.exports = {
  getUsers,
  addUser,
  changePassword,
};