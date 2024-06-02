const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Snowflake = require("@theinternetfolks/snowflake").Snowflake;

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => Snowflake.generate().toString(),
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  },
  { sequelize, modelName: "user", timestamps: true }
);

module.exports = User;
