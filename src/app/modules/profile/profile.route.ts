import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from '../admin/admin.validation';
import { EmployeeValidation } from '../employee/employee.validation';
import { UserValidation } from '../user/user.validation';
import { ProfileController } from './profile.controller';

const router = express.Router();

router.get(
  '/my-profile',
  auth(
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.EMPLOYEE,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  ProfileController.getMyProfile
);

router.patch(
  '/update-user-profile',
  validateRequest(UserValidation.updateUser),
  auth(ENUM_USER_ROLE.USER),
  ProfileController.updateUserProfile
);

router.patch(
  '/update-admin-profile',
  validateRequest(AdminValidation.updateAdmin),
  auth(ENUM_USER_ROLE.ADMIN),
  ProfileController.updateAdminProfile
);

router.patch(
  '/update-super-admin-profile',
  validateRequest(UserValidation.updateUser),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  ProfileController.updateSuperAdminProfile
);

router.patch(
  '/update-employee-profile',
  validateRequest(EmployeeValidation.updateEmployee),
  auth(ENUM_USER_ROLE.EMPLOYEE),
  ProfileController.updateEmployeeProfile
);

export const ProfileRoutes = router;
