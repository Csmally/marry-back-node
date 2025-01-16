import Router from "koa-router";
import ErrorObj from "../../common/utils/errorObj.js";
import { GiftUser, Chat, Photo, User } from "../../models/index.js";
import { ToastCode } from "../../common/consts/businessCode.js";
import sequelize from "../../config/database.js";

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

const getRandomUser = async (type) => {
  let openid;
  if (Number(type) === 1) {
    const randomChat = await Chat.findOne({
      order: sequelize.random()
    })
    openid = randomChat.dataValues.openid;
  } else {
    const randomPhoto = await Photo.findOne({
      order: sequelize.random()
    });
    openid = randomPhoto.dataValues.openid;
  }
  const randomUser = await GiftUser.findOne({
    where: { openid },
  });
  
  if (randomUser) {
    const nextLoopUser = await getRandomUser(type);
    return nextLoopUser;
  } else {
    await GiftUser.create({
      openid,
      type,
      isChecked: false
    });
    const user = await User.findOne({
      where: { openid }
    })
    return user.dataValues;
  }
}

router.get("/common/randomGiftUser", async (ctx) => {
  try {
    const { type } = ctx.request.query;
    // type-1: 弹幕抽奖  type-2: 相册抽奖
    const randomUser = await getRandomUser(type);
    ctx.body = { ...randomUser };
  } catch (error) {
    throw new ErrorObj();
  }
});

export default router;
