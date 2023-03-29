import express from "express";
import {getFeedPosts, getUserPosts, likePosts} from "../controllers/Posts.js";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

//read
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

//update
router.patch("/:id/like", verifyToken, likePosts);

export default router;
