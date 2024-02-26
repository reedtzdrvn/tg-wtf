import mongoose from "mongoose"

const SizeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    count: {
        type: Number,
        require: true
    }
})

export default mongoose.model("Size", SizeSchema);