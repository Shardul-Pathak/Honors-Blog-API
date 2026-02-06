import Blog from "../models/blogModel.js";
import Comment from "../models/commentModel.js";

export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate('userId', 'username').populate('blogId', 'title');
        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const getCommentsByUserId = async (req, res) => {
    try {
        const comments = await Comment.find({ userId: req.user.id }).populate('blogId', 'title');
        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const createComment = async (req, res) => {
    try {
        const comment = {
            content: req.body.content,
            userId: req.user.id,
            blogId: req.params.id,
        }
        const blog = await Blog.findById(comment.blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        const newComment = await Comment.create(comment);
        res.status(201).json({ message: "Comment created successfully", comment: newComment });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const getCommentsByBlogId = async (req, res) => {
    try {
        const comments = await Comment.find({ blogId: req.params.id }).populate('userId', 'username');
        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        if (comment.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}