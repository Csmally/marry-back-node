import Router from "koa-router";
import ErrorObj from "../../common/utils/errorObj.js";
import { GiftUser } from "../../models/index.js";
import { ToastCode } from "../../common/consts/businessCode.js";

const router = new Router();

router.get("/checkGift", async (ctx) => {
  try {
    const { openid } = ctx.request.header;
    const user = await GiftUser.findOne({
      where: { openid },
    });
    if (user) {
      ctx.body = { giftType: 2 };
    } else {
      ctx.body = { giftType: 1 };
    }
  } catch (error) {
    throw new ErrorObj();
  }
});

router.get("/checkClearGift", async (ctx) => {
  try {
    const { openid } = ctx.request.query;
    const user = await GiftUser.findOne({
      where: { openid },
    });
    if (user) {
      const userInfo = user.dataValues;
      if (userInfo.isChecked) {
        ctx.body = {
          message: '重复兑奖！！！',
          toastCode: ToastCode.error,
          openModal: false,
        };
      } else {
        ctx.body = { ...userInfo, openModal: true };
      }
    } else {
      ctx.body = {
        message: '二维码有误！！！',
        toastCode: ToastCode.error,
        openModal: false,
      };
    }
  } catch (error) {
    throw new ErrorObj();
  }
});

router.get("/confirmClearGift", async (ctx) => {
  try {
    const { openid } = ctx.request.query;
    const user = await GiftUser.findOne({
      where: { openid },
    });
    if (user) {
      const userInfo = user.dataValues;
      if (userInfo.isChecked) {
        ctx.body = {
          message: '重复兑奖！！！',
          toastCode: ToastCode.error,
        };
      } else {
        await GiftUser.update({
          isChecked: true
        }, { where: { openid } });
        ctx.body = {
          message: '兑奖成功！！！',
          toastCode: ToastCode.success,
        };
      }
    } else {
      ctx.body = {
        message: '二维码有误！！！',
        toastCode: ToastCode.error,
        openModal: false,
      };
    }
  } catch (error) {
    throw new ErrorObj();
  }
});

export default router;
