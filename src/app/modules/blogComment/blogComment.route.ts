import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogCommentController } from './blogComment.controller';
import { BlogCommentValidation } from './blogComment.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(BlogCommentValidation.createBlogComment),
  BlogCommentController.insertInToDB
);

router.get('/', BlogCommentController.getAllFromDB);

router.get('/:id', BlogCommentController.getSingleFromDB);

router.patch(
  '/:id',
  validateRequest(BlogCommentValidation.updateBlogComment),
  BlogCommentController.updateInToDB
);

router.delete('/:id', BlogCommentController.deleteFromDB);

export const BlogCommentRoutes = router;
