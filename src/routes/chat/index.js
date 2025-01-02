import Router from "koa-router";
import ErrorObj from "../../common/utils/errorObj.js";
import { ToastCode } from "../../common/consts/businessCode.js";
import { Chat } from "../../models/index.js";

const router = new Router();

router.post("/sendChat", async (ctx) => {
  try {
    const { openid } = ctx.request.header;
    const { chat } = ctx.request.body;
    await Chat.create({
      ...chat,
      openid,
    });
    ctx.body = {
      message: "收到您的祝福",
      toastCode: ToastCode.success,
    };
  } catch (error) {
    throw new ErrorObj(error, "发送祝福失败");
  }
});

export default router;
