const db = require("../config/db");

// Get All Stores
const getStores = (req, res) => {
  const sql = `
    SELECT
      s.*,
      IFNULL(AVG(r.rating),0) AS average_rating
    FROM stores s
    LEFT JOIN ratings r
      ON s.id = r.store_id
    GROUP BY s.id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

// Add Store
const addStore = (req, res) => {
  const { name, email, address } = req.body;

  const sql =
    "INSERT INTO stores(name,email,address) VALUES(?,?,?)";

  db.query(
    sql,
    [name, email, address],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Store Added Successfully",
      });
    }
  );
};

// Get Store By Owner
const getOwnerStore = (req, res) => {
  const ownerId = req.params.ownerId;

  const sql = `
    SELECT
      s.id,
      s.name,
      s.email,
      s.address,
      IFNULL(AVG(r.rating),0) AS average_rating
    FROM stores s
    LEFT JOIN ratings r
      ON s.id = r.store_id
    WHERE s.owner_id = ?
    GROUP BY s.id
  `;

  db.query(
    sql,
    [ownerId],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
};

// Get Users Who Rated Owner Store
const getStoreRatingsByOwner = (
  req,
  res
) => {
  const ownerId = req.params.ownerId;

  const sql = `
    SELECT
      u.name,
      u.email,
      r.rating
    FROM stores s
    JOIN ratings r
      ON s.id = r.store_id
    JOIN users u
      ON u.id = r.user_id
    WHERE s.owner_id = ?
  `;

  db.query(
    sql,
    [ownerId],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
};

module.exports = {
  getStores,
  addStore,
  getOwnerStore,
  getStoreRatingsByOwner,
};