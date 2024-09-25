import express from "express";
import { getPolicyAnswer } from "../controllers/policyController.js";
const router = express.Router();
router.post("/query", getPolicyAnswer);
export default router;
