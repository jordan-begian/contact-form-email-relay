import { Router } from "express";
import routes from "@/backend/routes/EmailRelayRoutes";

const router: Router = Router();

routes(router);

export default router;
