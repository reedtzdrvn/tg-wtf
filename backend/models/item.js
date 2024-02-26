import mongoose from "mongoose"

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
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
            type: mongoose.Schema.Types.ObjectId,
            require: true
        }
    ],
    description: {
        type: String,
        require: true
    }
})