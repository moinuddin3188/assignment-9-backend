import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { EmployeeController } from './employee.controller';
import { EmployeeValidation } from './employee.validation';

const router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  EmployeeController.getAllEmployees
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  EmployeeController.getSingleEmployee
);

router.patch(
  '/:id',
  validateRequest(EmployeeValidation.updateEmployee),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  EmployeeController.updateEmployee
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  EmployeeController.deleteEmployee
);

export const EmployeeRoutes = router;
