import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Photo = sequelize.define(
  "Photo",
  {
    openid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photoUrl: {
      type: DataTypes.STRING,
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

export default Photo;
