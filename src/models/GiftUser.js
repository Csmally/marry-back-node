import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const GiftUser = sequelize.define(
  "GiftUser",
  {
    openid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isChecked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    },
  }
);

export default GiftUser;
