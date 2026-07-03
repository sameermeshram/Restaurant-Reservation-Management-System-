import asyncHandler from '../middleware/asyncHandler.js';
import * as reservationService from '../services/reservationService.js';

export const createReservation = asyncHandler(async (req, res) => {
  const payload = {
    customer: req.user._id,
    reservationDate: req.body.reservationDate,
    timeSlot: req.body.timeSlot,
    guests: req.body.guests,
    status: req.body.status,
  };

  const reservation = await reservationService.createReservation(payload);

  res.status(201).json({
    success: true,
    message: 'Reservation created successfully',
    data: reservation,
  });
});

export const getReservations = asyncHandler(async (req, res) => {
  const reservations = await reservationService.getReservations(req.user);

  res.status(200).json({
    success: true,
    results: reservations.length,
    data: reservations,
  });
});

export const getMyReservations = asyncHandler(async (req, res) => {
  const reservations = await reservationService.getReservations(req.user);

  res.status(200).json({
    success: true,
    results: reservations.length,
    data: reservations,
  });
});

export const getReservationById = asyncHandler(async (req, res) => {
  const reservation = await reservationService.getReservationById(req.params.id, req.user);

  res.status(200).json({
    success: true,
    data: reservation,
  });
});

export const updateReservation = asyncHandler(async (req, res) => {
  const reservation = await reservationService.updateReservationById(
    req.params.id,
    req.body,
    req.user
  );

  res.status(200).json({
    success: true,
    message: 'Reservation updated successfully',
    data: reservation,
  });
});

export const deleteReservation = asyncHandler(async (req, res) => {
  await reservationService.deleteReservationById(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: 'Reservation deleted successfully',
  });
});
