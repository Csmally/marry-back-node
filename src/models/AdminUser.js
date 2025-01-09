import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const AdminUser = sequelize.define(
  "AdminUser",
  {
    openid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    powerLevel: {
      type: DataTypes.INTEGER,
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

export default AdminUser;
