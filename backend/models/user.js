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
        require: true
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
    }]
})

export default mongoose.model("User", UserSchema);