import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";


// 🛒 CREATE ORDER
export const createOrder = async (req, res) => {

  try {

    const {
      shippingInfo
    } = req.body;

    // 🔍 Find user's cart
    const cart = await Cart.findOne({
      user: req.user._id
    });

    // ❌ No cart
    if (!cart || cart.items.length === 0) {

      return res.status(400).json({
        message: "Cart is empty"
      });

    }

    // 💰 Calculate total
    const totalPrice = Number(
        cart.items.reduce(
            (total, item) => total + item.price * item.qty,
            0
        ).toFixed(2)
    );

    // 🧾 Create order
    const order = await Order.create({

      user: req.user._id,

      items: cart.items,

      shippingInfo,

      totalPrice

    });

    // 🧹 Clear cart after order
    cart.items = [];

    await cart.save();

    // ✅ Send response
    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// 📦 GET USER'S ORDERS
export const getMyOrders = async (req, res) => {
  try {
    
    const orders = await Order.find({
      user: req.user.id
    }).sort({
      createdAt: -1
    });

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}


// 📦 GET ALL ORDERS BY ID
export const getOrderById = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if(!order){
      return res.status(404).json({
        message: "Order not found"
      });
    }

    // Ensure user can only access their own orders
    if(order.user.toString() !== req.user.id){
      return res.status(401).json({
        message: "Unauthorized access"
      });
    }

    res.status(200).json(order);
    
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }

}