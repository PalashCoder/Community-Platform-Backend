const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Snowflake = require("@theinternetfolks/snowflake").Snowflake;

class Community extends Model {}

Community.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => Snowflake.generate().toString(),
    },
    name: DataTypes.STRING,
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    owner: {
      type: DataTypes.STRING,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  { sequelize, modelName: "community", timestamps: true }
);

module.exports = Community;
