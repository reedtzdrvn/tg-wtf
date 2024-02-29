import mongoose from "mongoose"

const EspeciallyForYouSchema = new mongoose.Schema({
    address: {
        type: String,
        require: true
    },
    information: {
        type: String,
        require: true
    },
    date: {
        type: mongoose.Schema.Types.Date,
        require: true
    },
})

export default mongoose.model("especiallyforyou", EspeciallyForYouSchema);