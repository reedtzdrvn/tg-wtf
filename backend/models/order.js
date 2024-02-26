import { text } from "express";
import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
    items: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
        },
        status: {
            type: Number,
            require: true,
        },
        track: {
            type: String,
        },
        approximateTime: {
            type: mongoose.Schema.Types.Date,
        },
        count: {
            type: Number,
            require: true
        }
    }],
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
    reserveNumber: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    presentAdress: {
        type: String,
        require: true
    },
    apartmentNumber: {
        type: Number,
        require: true
    },
    postalCode:{
        type: Number,
        require: true
    },
    postalCodeReserve:{
        type: Number,
    },
    additionalInformation: {
        type: String
    }
})

export default mongoose.model("Order", OrderSchema);