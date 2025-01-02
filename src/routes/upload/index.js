import Router from "koa-router";
import ErrorObj from "../../common/utils/errorObj.js";
import { ToastCode } from "../../common/consts/businessCode.js";
import { parse, join } from "path";

const isProd = process.env.NODE_ENV === "production" ? true : false;
// 获取根目录
const rootPath = parse(process.cwd()).root;
const uploadPath = isProd
  ? join(rootPath, "webProject/uploadFiles")
  : "/Users/yangxuan/Desktop/marry-project/nodeServerUploadFiles";

const router = new Router();

// 添加用户
router.post("/upload", async (ctx) => {
  try {
    const { targetFolder = "files" } = ctx.request.body;
    const files = ctx.request.files; // 获取上传的文件
    const file = files[targetFolder]; // 文件字段名为 "onelightfile"
    const filePath = join(uploadPath, targetFolder, file.newFilename);
    ctx.body = {
      message: "头像上传成功",
      avatar: `https://www.onelight.ink/userAssets/${targetFolder}/${file.newFilename}`
    };
  } catch (error) {
    throw new ErrorObj(error, "头像上传失败");
  }
});

export default router;
