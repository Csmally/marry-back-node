import Router from "koa-router";
import ErrorObj from "../../common/utils/errorObj.js";
import { ToastCode } from "../../common/consts/businessCode.js";
import jwt from "jsonwebtoken";
import { SECRET, MINIAPPID, MINISECRET } from "../../config/secret.js";
import axios from "axios";

const router = new Router();

// 添加用户
router.post("/login", async (ctx) => {
  try {
    const { loginCode } = ctx.request.body;
    const txRes = await axios.get(
      "https://api.weixin.qq.com/sns/jscode2session",
      {
        params: {
          appid: MINIAPPID,
          secret: MINISECRET,
          js_code: loginCode,
          grant_type: "authorization_code",
        },
      }
    );
    const openid = txRes.data.openid;
    // 用户验证成功，生成 JWT
    const token = jwt.sign({ openid }, SECRET, { expiresIn: "30d" });
    ctx.body = {
      message: "欢迎您的到来",
      toastCode: ToastCode.success,
      openid,
      token,
    };
  } catch (error) {
    throw new ErrorObj(error, "账号或密码错误");
  }
});

export default router;
