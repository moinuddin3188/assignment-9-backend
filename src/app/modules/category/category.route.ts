import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(CategoryValidation.createAndUpdateCategory),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  CategoryController.insertInToDB
);

router.get('/', CategoryController.getAllFromDB);

router.get('/:id', CategoryController.getSingleFromDB);

router.patch(
  '/:id',
  validateRequest(CategoryValidation.createAndUpdateCategory),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  CategoryController.updateInToDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  CategoryController.deleteFromDB
);

export const CategoryRoutes = router;
