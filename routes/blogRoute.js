import { Router } from "express";
import verifyJWT from "../middlewares/authMiddleware.js";
import { validateCreateBlog, validateUpdateBlog } from "../middlewares/validateBlog.js";
import * as blogController from "../controllers/blogController.js";

const router = Router();

router.get("/", blogController.getAllBlogs);
router.get("/author", verifyJWT, blogController.getBlogsByAuthor);
router.get("/:id", blogController.getBlogById);
router.post("/", verifyJWT, validateCreateBlog, blogController.createBlog);
router.put("/:id", verifyJWT, validateUpdateBlog, blogController.updateBlog);
router.delete("/:id", verifyJWT, blogController.deleteBlog);

export default router;