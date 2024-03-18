import mongoose from "mongoose"

const firstSliderSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        require: true
    }
})

export default mongoose.model("FirstSlider", firstSliderSchema);