import mongoose from "mongoose"

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    photos: [
        {
            type: String, 
        }
    ],
    price: {
        type: Number,
    },
    sale: {
        type: Number,
    },
    deliveryTime: {
        type: String,
    },
    sizes:[
        {
            id: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: "Size"
            },
            count: {
                type: Number,
            }
        }
    ],
    description: {
        type: String,
    },
    reviews: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Size"
        },
        telegramId: {
            type: String,
        },
        ratingsCount: {
            type: Number,
        },
        textReview:{
            type: String
        }
    }]
})

export default mongoose.model("Item", ItemSchema);