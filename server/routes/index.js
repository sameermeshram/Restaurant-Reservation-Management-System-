import { Router } from 'express';

import adminReservationRoutes from './adminReservationRoutes.js';
import authRoutes from './authRoutes.js';
import healthRoutes from './healthRoutes.js';
import reservationRoutes from './reservationRoutes.js';
import tableRoutes from './tableRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/admin', adminReservationRoutes);
router.use('/health', healthRoutes);
router.use('/reservations', reservationRoutes);
router.use('/tables', tableRoutes);

export default router;
