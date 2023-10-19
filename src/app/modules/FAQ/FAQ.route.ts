import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FAQController } from './FAQ.controller';
import { FAQValidation } from './FAQ.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(FAQValidation.createFAQ),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FAQController.insertInToDB
);

router.get('/', FAQController.getAllFromDB);

router.get('/:id', FAQController.getSingleFromDB);

router.patch(
  '/:id',
  validateRequest(FAQValidation.updateFAQ),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FAQController.updateInToDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FAQController.deleteFromDB
);

export const FAQRoutes = router;
