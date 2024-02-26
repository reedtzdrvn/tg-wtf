import mongoose from "mongoose"

const NotificationSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    date: {
        type: mongoose.Schema.Types.Date,
    }
})

export default mongoose.model("Notification", NotificationSchema);