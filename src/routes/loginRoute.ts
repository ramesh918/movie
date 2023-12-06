import express from 'express';
import { loginUser } from '../controllers/authController';
import validateRequest from '../middlewares/validationRequest'
import { loginValidationSchema } from '../validations/loginValidation';
const router = express.Router();

router.post('/login',validateRequest(loginValidationSchema, "body"), loginUser);

export default router;