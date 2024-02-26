import mongoose from "mongoose"

const SizeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }
})