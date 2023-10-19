import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signIn',
  validateRequest(UserValidation.createUser),
  AuthController.userSignIn
);

router.post(
  '/login',
  validateRequest(AuthValidation.logIn),
  AuthController.userLogin
);

export const AuthRoutes = router;
