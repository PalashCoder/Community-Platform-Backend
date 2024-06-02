const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Snowflake = require("@theinternetfolks/snowflake").Snowflake;

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => Snowflake.generate().toString(),
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isIn: [["Community Admin", "Community Member"]], // Only allow these values
      },
    },
  },
  { sequelize, modelName: "role", timestamps: true }
);

module.exports = Role;
