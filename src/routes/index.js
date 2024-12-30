import Router from "koa-router";
import loginRoutes from "./login/index.js";
import uploadRoutes from "./upload/index.js";

const router = new Router();

router.use(loginRoutes.routes()).use(router.allowedMethods());
router.use(uploadRoutes.routes()).use(router.allowedMethods());

export default router;
