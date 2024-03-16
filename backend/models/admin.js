import mongoose from "mongoose"

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

export default mongoose.model("Admin", AdminSchema);