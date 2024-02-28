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
    }],
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    especiallyForYou: [{
        type: mongoose.Schema.Types.ObjectId,
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