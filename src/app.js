const express = require("express");
const authRoutes = require("./routes/auth");
const communityRoutes = require("./routes/community");
const memberRoutes = require("./routes/member");
const sequelize = require("./utils/database");

const app = express();

app.use(express.json());

app.use("/v1/auth", authRoutes);
app.use("/v1/community", communityRoutes);
app.use("/v1/member", memberRoutes);

module.exports = app;
