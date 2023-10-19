import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(BookingValidation.createBooking),
  auth(ENUM_USER_ROLE.USER),
  BookingController.insertInToDB
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.getAllFromDB
);

router.get(
  '/my-bookings',
  auth(ENUM_USER_ROLE.USER),
  BookingController.getMyBookings
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.getSingleFromDB
);

router.patch(
  '/:id',
  validateRequest(BookingValidation.updateBooking),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.updateInToDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.deleteFromDB
);

router.patch(
  '/:id/cancel-booking',
  auth(ENUM_USER_ROLE.USER),
  BookingController.deleteFromDB
);

export const BookingRoutes = router;
