import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(ReviewValidation.createReview),
  auth(ENUM_USER_ROLE.USER),
  ReviewController.insertInToDB
);

router.get('/', ReviewController.getAllFromDB);

router.get('/:id', ReviewController.getSingleFromDB);

router.patch(
  '/:id',
  validateRequest(ReviewValidation.updateReview),
  auth(ENUM_USER_ROLE.USER),
  ReviewController.updateInToDB
);

router.delete('/:id', auth(ENUM_USER_ROLE.USER), ReviewController.deleteFromDB);

export const ReviewRoutes = router;
