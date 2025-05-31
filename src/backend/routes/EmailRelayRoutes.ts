import { Router } from "express";
import controller from "@/backend/controller/EmailRelayController";

export const routes = (router: Router): void => {
  router.post("/email", controller.emailRelay);
};

export default routes;
