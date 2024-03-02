import { text } from "express";
import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
    items: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
        },
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Item"
        },
        status: {
            type: Number,
            require: true,
            default: 1
        },
        track: {
            type: String,
            default: ""
        },
        approximateTime: {
            type: mongoose.Schema.Types.Date,
            require: true,
        },
        count: {
            type: Number,
            require: true
        },
        sizeId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Size"
        },
        size:{
            type: String,
            require: true
        }
    }],
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
    },
    phoneNumber:{
        type: String,
        require: true
    },
    telegramLink:{
        type: String,
        require: true
    },
    dateOrder: {
        type: mongoose.Schema.Types.Date,
        require: true
    },
    totalPrice: {
        type: Number,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    reservePhoneNumber: {
        type: String,
        require: true
    },
    presentAdress: {
        type: String,
        require: true
    },
    apartmentNumber: {
        type: String,
        require: true
    },
    postalCode:{
        type: String,
        require: true
    },
    postalCodeReserve:{
        type: String,
    },
    additionalInformation: {
        type: String
    }
})

export default mongoose.model("Order", OrderSchema);