import Router from "koa-router";
import ErrorObj from "../../common/utils/errorObj.js";
import { Config } from "../../models/index.js";
import { ToastCode } from "../../common/consts/businessCode.js";

const router = new Router();

router.get("/getConfigs", async (ctx) => {
  try {
    const config = await Config.findOne();
    ctx.body = config ? { ...config.dataValues } : {};
  } catch (error) {
    throw new ErrorObj();
  }
});

router.post("/editConfigs", async (ctx) => {
  try {
    const { uploadMediaSwitch = false } = ctx.request.body;
    await Config.upsert({
      uploadMediaSwitch,
      id: 1
    });
    ctx.body = {
      uploadMediaSwitch,
      message: `已${uploadMediaSwitch ? '打开' : '关闭'}开关`,
      toastCode: ToastCode.success,
    };
  } catch (error) {
    throw new ErrorObj();
  }
});

export default router;
