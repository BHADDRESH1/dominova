import { Router } from "express";
import * as ambassadorController from "../controllers/ambassador.controller";

const router = Router();

router.get("/", ambassadorController.getAllAmbassadors);
router.get("/:id", ambassadorController.getAmbassadorById);
router.get("/:id/stats", ambassadorController.getAmbassadorStats);
router.post("/", ambassadorController.createAmbassador);
router.put("/:id", ambassadorController.updateAmbassador);
router.delete("/:id", ambassadorController.deleteAmbassador);

export default router;
