import sequelize from "../config/database.js";
import User from "./User.js";
import Chat from "./Chat.js";
import Photo from "./Photo.js";
import Config from "./Config.js";

export const initDb = async () => {
  User.hasMany(Chat, {
    foreignKey: "openid",
    sourceKey: "openid",
    onDelete: "CASCADE",
  });
  Chat.belongsTo(User, { foreignKey: "openid", targetKey: "openid" });

  User.hasMany(Photo, {
    foreignKey: "openid",
    sourceKey: "openid",
    onDelete: "CASCADE",
  });
  Photo.belongsTo(User, { foreignKey: "openid", targetKey: "openid" });

  await sequelize.sync({ force: false });
};

export { User, Chat, Photo, Config };
