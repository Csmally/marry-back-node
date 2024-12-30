import Router from "koa-router";
import ErrorObj from "../../common/utils/errorObj.js";
import { ToastCode } from "../../common/consts/businessCode.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// 获取当前目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = new Router();

// 添加用户
router.post("/upload", async (ctx) => {
  try {
    const files = ctx.request.files; // 获取上传的文件
    const file = files.onelightfile; // 文件字段名为 "onelightfile"
    const filePath = join(
      __dirname,
      "/uploadFiles/userAvatar",
      file.newFilename
    );
    ctx.body = {
      message: "头像上传成功",
      toastCode: ToastCode.success,
    };
  } catch (error) {
    throw new ErrorObj(error, "头像上传失败");
  }
});

export default router;
