import { Router } from 'express';

import {
  createReservation,
  deleteReservation,
  getReservationById,
  getMyReservations,
  getReservations,
  updateReservation,
} from '../controllers/reservationController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import {
  validateCreateReservation,
  validateUpdateReservation,
} from '../validators/reservationValidator.js';

const router = Router();

router.use(protect);

router
  .route('/')
  .get(authorize('admin'), getReservations)
  .post(authorize('customer'), validateCreateReservation, createReservation);

router.route('/my').get(authorize('customer'), getMyReservations);

router
  .route('/:id')
  .get(authorize('customer', 'admin'), getReservationById)
  .put(authorize('customer', 'admin'), validateUpdateReservation, updateReservation)
  .delete(authorize('customer'), deleteReservation);

export default router;
