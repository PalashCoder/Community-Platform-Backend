const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Snowflake = require("@theinternetfolks/snowflake").Snowflake;

class Member extends Model {}

Member.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => Snowflake.generate().toString(),
    },
    community: {
      type: DataTypes.STRING,
      references: {
        model: "communities",
        key: "id",
      },
    },
    user: {
      type: DataTypes.STRING,
      references: {
        model: "users",
        key: "id",
      },
    },
    role: {
      type: DataTypes.STRING,
      references: {
        model: "roles",
        key: "id",
      },
    },
  },
  { sequelize, modelName: "member", timestamps: true }
);

module.exports = Member;
