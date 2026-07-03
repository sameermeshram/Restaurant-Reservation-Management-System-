import { Router } from 'express';

import {
  createTable,
  deleteTable,
  getTables,
  updateTable,
} from '../controllers/tableController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import {
  validateCreateTable,
  validateUpdateTable,
} from '../validators/tableValidator.js';

const router = Router();

router.use(protect, authorize('admin'));

router.route('/').post(validateCreateTable, createTable).get(getTables);
router.route('/:id').put(validateUpdateTable, updateTable).delete(deleteTable);

export default router;
