import { routes } from "@/backend/routes/EmailRelayRoutes";
import { Router } from "express";

const router: Router = Router();
routes(router);

export { router };
