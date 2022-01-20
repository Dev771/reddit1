import express from 'express';
import { getPost, createPost, likePost } from '../controller/Posts.js';

const router = express.Router();

router.get('/', getPost);
router.post('/', createPost);
router.patch('/:id/likePost', likePost);

export default router;