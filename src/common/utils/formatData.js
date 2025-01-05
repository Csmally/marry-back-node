import { BusinessCode, ToastCode } from "../consts/businessCode.js";

const formatResponseData = async (ctx, next) => {
  // 调用下一个中间件
  await next();

  // 如果是 SSE 请求，不进行格式化
  if (ctx.response.headers["content-type"] === "text/event-stream") {
    return;
  }
  // 统一格式化响应体
  const body = ctx.body;
  const { message, toastCode = ToastCode.no, code, ...others } = body || {};
  if (ctx.response.status === 200) {
    ctx.body = {
      success: true,
      code: BusinessCode.success,
      toastCode: toastCode,
      data: others,
      message: message || "请求成功",
    };
  } else {
    ctx.body = {
      success: false,
      data: null,
      code: BusinessCode.error,
      toastCode: ToastCode.error,
      message: message || "请求失败",
    };
  }
};

export default formatResponseData;
