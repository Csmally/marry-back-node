import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Config = sequelize.define(
  "Config",
  {
    uploadMediaSwitch: {
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

export default Config;
