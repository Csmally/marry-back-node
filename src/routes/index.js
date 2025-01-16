import Router from "koa-router";
import loginRoutes from "./login/index.js";
import ChatRoutes from "./chat/index.js";
import ConfigRoutes from "./config/index.js";
import GiftRoutes from "./gift/index.js";
import PowerRoutes from "./power/index.js";

const router = new Router();

router.use(loginRoutes.routes()).use(router.allowedMethods());
router.use(ChatRoutes.routes()).use(router.allowedMethods());
router.use(ConfigRoutes.routes()).use(router.allowedMethods());
router.use(GiftRoutes.routes()).use(router.allowedMethods());
router.use(PowerRoutes.routes()).use(router.allowedMethods());

export default router;
