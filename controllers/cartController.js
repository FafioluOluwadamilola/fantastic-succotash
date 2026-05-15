import Cart from "../models/cartModel.js";


// 🛒 GET USER CART
export const getCart = async (req, res) => {
  try {

    // 🔍 Find cart belonging to logged-in user
    const cart = await Cart.findOne({
      user: req.user._id
    });

    // ✅ If no cart yet
    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// ➕ ADD TO CART
export const addToCart = async (req, res) => {

  try {

    const {
      productId,
      name,
      image,
      price
    } = req.body;

    // 🔍 Find user's cart
    let cart = await Cart.findOne({
      user: req.user._id
    });

    // 🆕 If cart doesn't exist → create one
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: []
      });
    }

    // 🔍 Check if item already exists
    const existingItem = cart.items.find(
      (item) => Number(item.productId) === Number(productId)
    );

    if (existingItem) {

      // ➕ Increase quantity
      existingItem.qty += 1;

    } else {

      // 🆕 Push new item
      cart.items.push({
        productId,
        name,
        image,
        price,
        qty: 1
      });
    }

    await cart.save();

    res.json(cart);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


export const removeFromCart = async (req, res) => {

  try {

    const cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    cart.items = cart.items.filter(
      (item) =>
        Number(item.productId) !== Number(req.params.productId)
    );

    await cart.save();

    res.json(cart);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// ➖ DECREASE QTY
export const decreaseCartItem = async (req, res) => {

  try {

    const cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    const item = cart.items.find(
      (item) => Number(item.productId) === Number(req.params.productId)
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    // ➖ Reduce quantity
    item.qty -= 1;

    // ❌ Remove item if qty becomes 0
    if (item.qty <= 0) {

      cart.items = cart.items.filter(
        (item) =>
          item.productId !== Number(req.params.productId)
      );

    }

    await cart.save();

    res.json(cart);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// 🧹 CLEAR CART
export const clearCart = async (req, res) => {

  try {

    const cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    // 🧹 empty array
    cart.items = [];

    await cart.save();

    // 🔥 return updated cart
    res.json(cart);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};