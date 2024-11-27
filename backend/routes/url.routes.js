import express from "express";
import {
	getStats,
	redirectToOriginal,
	shortenUrl,
} from "../controllers/url.controller.js";

const router = express.Router();

router.post("/shorten", shortenUrl);
router.get("/:shortId", redirectToOriginal);
router.get("/stats/:shortId", getStats);

export default router;
