import { Sequelize } from "sequelize";

const isProd = process.env.NODE_ENV === "production" ? true : false;
// 配置数据库连接信息
const sequelize = new Sequelize(isProd ? "marry_db_prod" : "marry_db_dev", "root", "cy4u1314", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
