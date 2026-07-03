import { Router } from 'express';

import {
  getAdminResource,
  getMe,
  login,
  register,
} from '../controllers/authController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import {
  validateLogin,
  validateRegister,
} from '../validators/authValidator.js';

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/me', protect, getMe);
router.get('/admin', protect, authorize('admin'), getAdminResource);

export default router;
