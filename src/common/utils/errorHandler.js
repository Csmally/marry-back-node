import { BusinessCode, ToastCode } from "../consts/businessCode.js";

const errorHandler = async (ctx, next) => {
  try {
    await next(); // 执行后续中间件或路由
  } catch (err) {
    // console.error("9898---error", err); // 打印错误日志（可以根据需求增强日志记录功能）
    // 设置统一的错误状态和响应结构
    const isNoAuth = err.status === BusinessCode.noAuth;
    ctx.status = 500;
    ctx.body = {
      success: false,
      code: isNoAuth ? BusinessCode.noAuth : BusinessCode.error,
      toastCode: ToastCode.error,
      message: isNoAuth ? "请重新登录" : err.message,
      data: null,
    };
  }
};

export default errorHandler;
