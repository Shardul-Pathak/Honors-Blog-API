import { Router } from "express";
import verifyJWT from "../middlewares/authMiddleware.js";
import { validateCreateBlog, validateUpdateBlog } from "../middlewares/validateBlog.js";
import * as blogController from "../controllers/blogController.js";

const router = Router();

router.post("/", verifyJWT, validateCreateBlog, blogController.createBlog);
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.put("/:id", verifyJWT, validateUpdateBlog, blogController.updateBlog);
router.delete("/:id", verifyJWT, blogController.deleteBlog);

export default router;