import Router from "koa-router";
import ErrorObj from "../../common/utils/errorObj.js";
import { ToastCode } from "../../common/consts/businessCode.js";
import jwt from "jsonwebtoken";
import SECRET from "../../config/secret.js";

const router = new Router();

// 添加用户
router.post("/login", async (ctx) => {
  try {
    const { loginCode } = ctx.request.body;
    console.log('9898-loginCode', loginCode);
    // 用户验证成功，生成 JWT
    const token = jwt.sign({ loginCode }, SECRET, { expiresIn: "30d" });
    console.log('9898-token', token);
    ctx.body = {
      message: "欢迎您的到来",
      toastCode: ToastCode.success,
      token,
    };
  } catch (error) {
    throw new ErrorObj(error, "账号或密码错误");
  }
});

export default router;
