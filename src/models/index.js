import sequelize from "../config/database.js";
import User from "./User.js";
import Chat from "./Chat.js";
import Photo from "./Photo.js";
import Config from "./Config.js";
import GiftUser from "./GiftUser.js";
import AdminUser from "./AdminUser.js";

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

  User.hasOne(GiftUser, {
    foreignKey: "openid",
    sourceKey: "openid",
    onDelete: "CASCADE",
  });
  GiftUser.belongsTo(User, { foreignKey: "openid", targetKey: "openid" });

  User.hasOne(AdminUser, {
    foreignKey: "openid",
    sourceKey: "openid",
    onDelete: "CASCADE",
  });
  AdminUser.belongsTo(User, { foreignKey: "openid", targetKey: "openid" });

  await sequelize.sync({ force: false });
};

export { User, Chat, Photo, Config, GiftUser, AdminUser };
