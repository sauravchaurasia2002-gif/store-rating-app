const db = require("../config/db");

// Get All Ratings
const getRatings = (req, res) => {
  const sql = "SELECT * FROM ratings";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

// Add Rating
const addRating = (req, res) => {
  const { user_id, store_id, rating } = req.body;

  const checkSql =
    "SELECT * FROM ratings WHERE user_id=? AND store_id=?";

  db.query(
    checkSql,
    [user_id, store_id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length > 0) {
        return res.status(400).json({
          message:
            "You have already rated this store",
        });
      }

      const insertSql =
        "INSERT INTO ratings(user_id, store_id, rating) VALUES(?,?,?)";

      db.query(
        insertSql,
        [user_id, store_id, rating],
        (err, result) => {
          if (err) {
            return res.status(500).json(err);
          }

          res.status(201).json({
            message:
              "Rating Added Successfully",
          });
        }
      );
    }
  );
};

// Update Rating
const updateRating = (req, res) => {
  const { user_id, store_id, rating } = req.body;

  const sql =
    "UPDATE ratings SET rating=? WHERE user_id=? AND store_id=?";

  db.query(
    sql,
    [rating, user_id, store_id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message:
          "Rating Updated Successfully",
      });
    }
  );
};

module.exports = {
  getRatings,
  addRating,
  updateRating,
};