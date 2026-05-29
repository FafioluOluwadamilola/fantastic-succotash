import express from "express";

import protect from "../middleware/authMiddleware.js";

import { createOrder, getMyOrders  } from "../controllers/orderController.js";

const router = express.Router();


// 🛒 CREATE ORDER
router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);

export default router;