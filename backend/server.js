require("dotenv").config();

const adminRoutes = require("./routes/adminRoutes");
const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const ratingRoutes = require("./routes/ratingRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const storeRoutes = require("./routes/storeRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Backend + MySQL Connected");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
