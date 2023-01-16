
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    body: {
        type: String,
        required: true
    },
    device: {
        type: String,
        enum: ["PC", "TABLET", "MOBILE"]
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);


const PostModel = mongoose.model("post", postSchema);

module.exports = { PostModel }