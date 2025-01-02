import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Chat = sequelize.define(
  "Chat",
  {
    content: {
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

export default Chat;
