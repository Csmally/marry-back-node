import Router from "koa-router";
import ErrorObj from "../../common/utils/errorObj.js";
import { AdminUser } from "../../models/index.js";

const router = new Router();

router.get("/checkPowerLevel", async (ctx) => {
  try {
    const { openid } = ctx.request.header;
    const user = await AdminUser.findOne({
      where: { openid },
    });
    ctx.body = { isAdminUser: user ? true : false };
  } catch (error) {
    throw new ErrorObj();
  }
});

router.post("/editUserPower", async (ctx) => {
  try {
    const { users = [] } = ctx.request.body;
    await AdminUser.bulkCreate(users, {
      ignoreDuplicates: true, // 如果 openid 存在就跳过插入
    });
    ctx.body = {};
  } catch (error) {
    throw new ErrorObj();
  }
});

export default router;
