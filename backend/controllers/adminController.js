const db = require("../config/db");

const getDashboardStats = (req, res) => {

  const usersSql = "SELECT COUNT(*) AS totalUsers FROM users";
  const storesSql = "SELECT COUNT(*) AS totalStores FROM stores";
  const ratingsSql = "SELECT COUNT(*) AS totalRatings FROM ratings";

  db.query(usersSql, (err, usersResult) => {

    if (err) {
      return res.status(500).json(err);
    }

    db.query(storesSql, (err, storesResult) => {

      if (err) {
        return res.status(500).json(err);
      }

      db.query(ratingsSql, (err, ratingsResult) => {

        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          totalUsers: usersResult[0].totalUsers,
          totalStores: storesResult[0].totalStores,
          totalRatings: ratingsResult[0].totalRatings,
        });

      });
    });
  });
};

module.exports = {
  getDashboardStats,
};