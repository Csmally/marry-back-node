import Router from "koa-router";
import ErrorObj from "../../common/utils/errorObj.js";
import { GiftUser } from "../../models/index.js";

const router = new Router();

const clients = new Map();

router.get("/checkGift", async (ctx) => {
  try {
    const { openid } = ctx.request.header;
    const user = await GiftUser.findOne({
      where: { openid },
    });
    if (user) {
      ctx.body = { giftType: 2 };
    } else {
      ctx.body = { giftType: 1 };
    }
  } catch (error) {
    throw new ErrorObj();
  }
});

export default router;
