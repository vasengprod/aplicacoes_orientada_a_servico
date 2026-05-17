import { Router } from "express";
import { sessionController } from "../controllers";

const router = Router();

router.post("/", sessionController.login);
router.get("/", sessionController.getSession);
router.delete("/", sessionController.logout);
router.post("/refresh", sessionController.refresh);

export default router;