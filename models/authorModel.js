import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    username: { type: String, required: true },
    bio: { type: String },
    profilePicture: { type: String },
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog', default: [] }],
}, { timestamps: true });

const Author = mongoose.model('Author', authorSchema);

export default Author;