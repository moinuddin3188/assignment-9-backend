import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from '../admin/admin.validation';
import { EmployeeValidation } from '../employee/employee.validation';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getAllUsers
);

router.post(
  '/create-user',
  validateRequest(UserValidation.createUser),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.createUser
);

router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdmin),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.createAdmin
);

router.post(
  '/create-employee',
  validateRequest(EmployeeValidation.createEmployee),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.createEmployee
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getSingleUser
);

router.patch(
  '/:id',
  validateRequest(UserValidation.updateUser),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.updateUser
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.deleteUser
);

export const UserRoutes = router;
