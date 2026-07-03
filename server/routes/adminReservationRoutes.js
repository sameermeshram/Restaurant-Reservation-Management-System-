import { Router } from 'express';

import {
  deleteAdminReservation,
  getAdminReservations,
  updateAdminReservation,
} from '../controllers/adminReservationController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import { validateUpdateReservation } from '../validators/reservationValidator.js';

const router = Router();

router.use(protect, authorize('admin'));

router.route('/reservations').get(getAdminReservations);
router
  .route('/reservations/:id')
  .put(validateUpdateReservation, updateAdminReservation)
  .delete(deleteAdminReservation);

export default router;
