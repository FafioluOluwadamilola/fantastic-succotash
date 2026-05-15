import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getCart,
  addToCart,
  removeFromCart,
  decreaseCartItem,
  clearCart
} from "../controllers/cartController.js";

const router = express.Router();


// 🛒 GET CART
router.get("/", protect, getCart);


// ➕ ADD ITEM
router.post("/", protect, addToCart);


// ➖ DECREASE ITEM QTY
router.patch(
  "/decrease/:productId",
  protect,
  decreaseCartItem
);


// 🧹 CLEAR CART
router.delete(
  "/clear",
  protect,
  clearCart
);


// ❌ REMOVE ITEM
router.delete(
  "/:productId",
  protect,
  removeFromCart
);



export default router;