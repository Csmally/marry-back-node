import Router from "koa-router";
import ErrorObj from "../../common/utils/errorObj.js";
import { Config } from "../../models/index.js";

const router = new Router();

router.get("/getConfigs", async (ctx) => {
  try {
    const config = await Config.findOne();
    ctx.body = config ? { ...config.dataValues } : {};
  } catch (error) {
    throw new ErrorObj();
  }
});

export default router;
