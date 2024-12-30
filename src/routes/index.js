import Router from "koa-router";
import loginRoutes from "./login/index.js";

const router = new Router();

router.use(loginRoutes.routes()).use(router.allowedMethods());

export default router;
