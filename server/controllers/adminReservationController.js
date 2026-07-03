import asyncHandler from '../middleware/asyncHandler.js';
import AppError from '../utils/AppError.js';
import * as reservationService from '../services/reservationService.js';

const isValidDateParam = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value);

export const getAdminReservations = asyncHandler(async (req, res) => {
  const { date, page, limit } = req.query;

  if (date && !isValidDateParam(date)) {
    throw new AppError('date must be in YYYY-MM-DD format', 400);
  }

  const { reservations, pagination } = await reservationService.getAdminReservations({
    date,
    page,
    limit,
  });

  res.status(200).json({
    success: true,
    data: reservations,
    pagination,
  });
});

export const updateAdminReservation = asyncHandler(async (req, res) => {
  const reservation = await reservationService.updateReservationByAdmin(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: 'Reservation updated successfully',
    data: reservation,
  });
});

export const deleteAdminReservation = asyncHandler(async (req, res) => {
  await reservationService.deleteReservationByAdmin(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Reservation deleted successfully',
  });
});
