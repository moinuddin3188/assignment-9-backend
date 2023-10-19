import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { RepairingServiceController } from './repairingService.controller';
import { ServiceValidation } from './repairingService.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(ServiceValidation.createRepairingService),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  RepairingServiceController.insertInToDB
);

router.get('/', RepairingServiceController.getAllFromDB);

router.get('/:id', RepairingServiceController.getSingleFromDB);

router.patch(
  '/:id',
  validateRequest(ServiceValidation.updateRepairingService),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  RepairingServiceController.updateInToDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  RepairingServiceController.deleteFromDB
);

export const RepairingServiceRoutes = router;
