import express from 'express';

const router = express.Router();

import { createReview,getReviewsByBookId,updateReview,deleteReview}  from '../controllers/review.controller.js';
import { verifyJwt } from '../middleware/Authentication.js';


router.post('/',verifyJwt, createReview);
router.get('/:bookId', getReviewsByBookId);
router.put('/:id',verifyJwt, updateReview);
router.delete('/:id',verifyJwt, deleteReview);
export default router;