import { Router } from 'express';
import { userController } from './user.controller';
import { auth } from '../../middleware/auth';
import { Role } from '../../../generated/prisma/client';

const router = Router();

router.post('/register', userController.userRegister);
router.get('/my-profile', auth(Role.USER, Role.ADMIN, Role.TECHNICIAN), userController.getUserProfile);

export const userRoutes = router;
