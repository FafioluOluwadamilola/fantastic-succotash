import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
    {

        //Owner of the cart
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true
        },

        //Products in the cart
        items: [
            {
              productId: {
                    type: Number,
                    required: true
                },
                
                name: String,
                image: String,
                price: Number,

                qty: {
                    type: Number,
                    default: 1
                }

            }
        ]
    },
    {
        timestamps: true
    }
)

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;