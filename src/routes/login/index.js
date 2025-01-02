import Router from "koa-router";
import ErrorObj from "../../common/utils/errorObj.js";
import { ToastCode } from "../../common/consts/businessCode.js";
import jwt from "jsonwebtoken";
import { SECRET, MINIAPPID, MINISECRET } from "../../config/secret.js";
import axios from "axios";
import { User } from "../../models/index.js";

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
    const token = jwt.sign({ openid }, SECRET, { expiresIn: "7d" });
    const user = await User.findOne({
      where: { openid },
    });
    ctx.body = {
      openid,
      token,
      user,
      message: "感谢您的参加",
      toastCode: ToastCode.success,
    };
  } catch (error) {
    throw new ErrorObj(error, "登记失败");
  }
});

router.post("/addUser", async (ctx) => {
  try {
    const user = ctx.request.body;
    await User.create(user);
    ctx.body = {
      message: "登记成功",
      toastCode: ToastCode.success,
    };
  } catch (error) {
    throw new ErrorObj(error, "登记失败");
  }
});

export default router;
