import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createReviewController } from '../controllers/reviewController.js';

const reviewRoutes = express.Router();

reviewRoutes.post('/:productId/createReview', isLoggedIn, createReviewController);


export default reviewRoutes;