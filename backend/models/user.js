import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    userName: {
        type: String,
        require: true,
    },
    phoneNumber: {
        type: String,
        require: true
    },
    email: {
        type: String,
    },
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }],
    cart: [{
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item"
        },
        count: {
            type: Number, 
            require: true
        },
        size: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Size"
        }
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
    especiallyForYou: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "especiallyforyou"
    }],
    admin: {
        type: Boolean,
        default: false
    },
    telegramId: {
        type: String,
        require: true
    },
    notifications: [{
        name: {
            type: String,
            require: true
        },
        date: {
            type: mongoose.Schema.Types.Date,
            require: true
        },
        seen: {
            type: Boolean,
            require: true,
            default: false
        }
    }]
})

export default mongoose.model("User", UserSchema);