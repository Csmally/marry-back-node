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
    if (user) {
      ctx.body = { powerLevel: user.dataValues.powerLevel };
    } else {
      ctx.body = { powerLevel: 0 };
    }
  } catch (error) {
    throw new ErrorObj();
  }
});

export default router;
