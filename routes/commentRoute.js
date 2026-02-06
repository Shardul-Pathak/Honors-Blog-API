import { Router } from "express";
import verifyJWT from "../middlewares/authMiddleware.js";
import { validateCreateComment, validateUpdateComment } from "../middlewares/validateComment.js";
import * as commentController from "../controllers/commentController.js";

const router = Router();

router.get("/", commentController.getAllComments);
router.get("/user", verifyJWT, commentController.getCommentsByUserId);
router.get("/:id", commentController.getCommentsByBlogId);
router.post("/:id", verifyJWT, validateCreateComment, commentController.createComment);
router.delete("/:id", verifyJWT, validateUpdateComment, commentController.deleteComment);

export default router;