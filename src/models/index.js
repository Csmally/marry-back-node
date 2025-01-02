import sequelize from "../config/database.js";
import User from "./User.js";
import Chat from "./Chat.js";
import Photo from "./Photo.js";


export const initDb = async () => {
    User.hasMany(Chat, { foreignKey: "openid", onDelete: "CASCADE" });
    Chat.belongsTo(User, { foreignKey: "openid" });
    
    User.hasMany(Photo, { foreignKey: "openid", onDelete: "CASCADE" });
    Photo.belongsTo(User, { foreignKey: "openid" });
    
    await sequelize.sync({ force: false });
};

export { User, Chat, Photo };