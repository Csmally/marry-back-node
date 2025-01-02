import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    openid: {
        type: DataTypes.STRING(191),
        allowNull: false,
        unique: true,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    defaultScope: {
        attributes: {
            exclude: ["createdAt", "updatedAt"],
      },
    },
  }
);

export default User;
