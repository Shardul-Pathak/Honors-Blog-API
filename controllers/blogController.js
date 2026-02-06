import Blog from '../models/blogModel.js';
import Author from '../models/authorModel.js';

export async function createBlog(req, res) {
    try {
        const blog = {
            title: req.body.title,
            content: req.body.content,
            authorId: req.user.authorId,
        }
        const newBlog = await Blog.create(blog);
        const author = await Author.findById(blog.authorId);
        author.blogs.push(newBlog._id);
        await author.save();
        res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export async function getAllBlogs(req, res) {
    try {
        const blogs = await Blog.find().populate('authorId', 'username');
        res.status(200).json({ blogs });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export async function getBlogsByAuthor(req, res) {
    try {
        const blogs = await Blog.find({ authorId: req.user.authorId }).populate('authorId', 'username');
        res.status(200).json({ blogs });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export async function getBlogById(req, res) {
    try {
        const blog = await Blog.findById(req.params.id).populate('authorId', 'username');
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ blog });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export async function updateBlog(req, res) {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        if (blog.authorId.toString() !== req.user.authorId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const updatedBlog = {
            title: req.body.title,
            content: req.body.content,
            authorId: req.user.authorId,
        }
        const result = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, { new: true });
        res.status(200).json({ message: 'Blog updated successfully', blog: result });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}   

export async function deleteBlog(req, res) {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        if (blog.authorId.toString() !== req.user.authorId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        await Blog.findByIdAndDelete(req.params.id);
        const author = await Author.findById(blog.authorId);
        author.blogs.pull(blog._id);
        await author.save();
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}