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
        `event: addChat\ndata: ${JSON.stringify({
          ...chat,
          openid,
          avatar: user.avatar,
        })}\n\n`
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
router.post("/ssePhotoTest", async (ctx) => {
  try {
    clients.forEach((c) => {
      c.res.write(`event: addPhoto\ndata: photophoto\n\n`);
    });
    ctx.body = {
      message: "sse上传图片测试成功",
      toastCode: ToastCode.success,
    };
  } catch (error) {
    throw new ErrorObj(error, "sse上传图片测试失败");
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

router.get("/common/randomChats", async (ctx) => {
  try {
    const total = await Chat.count(); // 获取表中总记录数
    const randomOffset =
      total > 10 ? Math.floor(Math.random() * (total - 10)) : 0; // 随机偏移量
    const randomChats = await Chat.findAll({
      limit: 10,
      offset: randomOffset,
      include: [
        {
          model: User,
          attributes: ["avatar"],
        },
      ],
      raw: true,
    });
    clients.forEach((c) => {
      c.res.write("event: heart\ndata: KeepSSELive\n\n");
    });
    ctx.body = {
      list: randomChats,
    };
  } catch (error) {
    throw new ErrorObj(error);
  }
});

router.post("/upload", async (ctx) => {
  try {
    const { targetFolder = "files", sseSend = false } = ctx.request.body;
    const files = ctx.request.files; // 获取上传的文件
    const file = files[targetFolder];
    ctx.body = {
      message: "头像上传成功",
      avatar: `https://www.onelight.ink/userAssets/${targetFolder}/${file.newFilename}`,
    };
  } catch (error) {
    throw new ErrorObj(error, "上传失败");
  }
});

export default router;
