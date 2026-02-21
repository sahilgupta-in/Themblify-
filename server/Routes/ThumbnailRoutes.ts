import express from 'express';
import { generateThumbnail, getUserThumbnails, getThumbnailById } from '../controllers/ThumbnailController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// Generate a new thumbnail
router.post('/generate', protect, generateThumbnail);

// Get all thumbnails for the current user
router.get('/', protect, getUserThumbnails);

// Get a single thumbnail by ID
router.get('/:id', protect, getThumbnailById);

export default router;
