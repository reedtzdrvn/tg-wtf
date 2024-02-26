import mongoose from "mongoose"

const EspeciallyForYouSchema = new mongoose.Schema({
    adress: {
        type: String,
        require: true
    },
    information: {
        type: String,
        require: true
    },
})

export default mongoose.model("especiallyforyou", EspeciallyForYouSchema);