import mongoose from "mongoose"

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    }
})

export default mongoose.model("Category", CategorySchema);