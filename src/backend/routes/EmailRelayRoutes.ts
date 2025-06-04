import controller from "@/backend/controller/EmailRelayController";
import { Router } from "express";

const routes = (router: Router): void => {
  router.post("/email", controller.emailRelay);
};

export { routes };
