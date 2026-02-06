import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;