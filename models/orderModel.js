import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(

  {
    // 👤 User who placed order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // 🛒 Purchased items
    items: [
      {
        productId: Number,

        name: String,

        image: String,

        price: Number,

        qty: Number
      }
    ],

    // 🚚 Shipping Information
    shippingInfo: {

      fullName: {
        type: String,
        required: true
      },

      address: {
        type: String,
        required: true
      },

      city: {
        type: String,
        required: true
      },

      phone: {
        type: String,
        required: true
      }

    },

    // 💰 Total Order Price
    totalPrice: {
      type: Number,
      required: true
    },

    // 📦 Order Status
    status: {
      type: String,
      default: "Processing"
    }

  },

  {
    timestamps: true
  }

);

const Order = mongoose.model("Order", orderSchema);

export default Order;