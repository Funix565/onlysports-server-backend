import express from "express";
import { login } from "../controllers/auth.js";

// This piece of code will allow Express to identify
// that these routes will all be configured
const router = express.Router();

// With "/auth" prefix
router.post("/login", login);

export default router;