import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(BlogValidation.createBlog),
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.EMPLOYEE
  ),
  BlogController.insertInToDB
);

router.get('/', BlogController.getAllFromDB);

router.get('/:id', BlogController.getSingleFromDB);

router.patch(
  '/:id',
  validateRequest(BlogValidation.updateBlog),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BlogController.updateInToDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BlogController.deleteFromDB
);

export const BlogRoutes = router;
