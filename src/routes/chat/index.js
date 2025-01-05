import Router from "koa-router";
import ErrorObj from "../../common/utils/errorObj.js";
import { ToastCode } from "../../common/consts/businessCode.js";
import { Chat, User } from "../../models/index.js";
import { PassThrough } from "stream";

const router = new Router();

const clients = new Map();

router.post("/sendChat", async (ctx) => {
  try {
    const { openid } = ctx.request.header;
    const { chat } = ctx.request.body;
    const user = await User.findOne({
      where: { openid },
    });
    await Chat.create({
      ...chat,
      openid,
    });
    clients.forEach((c) => {
      c.res.write(
        `data: ${JSON.stringify({ ...chat, openid, avatar: user.avatar })}\n\n`
      );
    });
    ctx.body = {
      message: "收到您的祝福",
      toastCode: ToastCode.success,
    };
  } catch (error) {
    throw new ErrorObj(error, "发送祝福失败");
  }
});

router.get("/common/sse", async (ctx) => {
  ctx.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const stream = new PassThrough();
  ctx.body = stream;
  ctx.status = 200;

  const { uuid } = ctx.query;
  clients.set(uuid, ctx);

  ctx.req.on("close", () => {
    clients.delete(uuid);
  });
});

export default router;
