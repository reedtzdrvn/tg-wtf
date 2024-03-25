import mongoose from "mongoose"

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Category"
    },
    photos: [
        {
            type: String, 
            require: true
        }
    ],
    price: {
        type: Number,
        require: true
    },
    sale: {
        type: Number,
        require: true
    },
    deliveryTime: {
        type: String,
        require: true
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
        require: true
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