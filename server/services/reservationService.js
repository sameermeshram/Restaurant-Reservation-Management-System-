import Reservation from '../models/Reservation.js';
import Table from '../models/Table.js';
import AppError from '../utils/AppError.js';

const basePopulate = [
  { path: 'customer', select: 'name email role' },
  { path: 'table', select: 'tableNumber capacity isActive' },
];

const ensureTableIsAvailable = async (tableId) => {
  const table = await Table.findById(tableId);

  if (!table) {
    throw new AppError('Table not found', 404);
  }

  if (!table.isActive) {
    throw new AppError('Selected table is inactive', 400);
  }

  return table;
};

const normalizeReservationDate = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new AppError('reservationDate must be a valid date', 400);
  }

  date.setUTCHours(0, 0, 0, 0);
  return date;
};

const isDuplicateReservationError = (error) =>
  error && error.code === 11000 && error.keyPattern && error.keyPattern.table;

const ensureReservationOwnership = (reservation, user) => {
  if (user.role === 'admin') {
    return;
  }

  if (reservation.customer._id.toString() !== user._id.toString()) {
    throw new AppError('Forbidden: insufficient permissions', 403);
  }
};

const ensureNoSlotConflict = async ({ table, reservationDate, timeSlot, excludeId }) => {
  const query = {
    table,
    reservationDate: normalizeReservationDate(reservationDate),
    timeSlot,
    status: 'confirmed',
  };

  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  const conflict = await Reservation.findOne(query);
  if (conflict) {
    throw new AppError('This table is already reserved for the selected date and time slot', 409);
  }
};

const findSmallestAvailableTable = async ({ guests, reservationDate, timeSlot }) => {
  const normalizedDate = normalizeReservationDate(reservationDate);

  const reservedTableIds = await Reservation.distinct('table', {
    reservationDate: normalizedDate,
    timeSlot,
    status: 'confirmed',
  });

  const table = await Table.findOne({
    isActive: true,
    capacity: { $gte: guests },
    _id: { $nin: reservedTableIds },
  })
    .sort({ capacity: 1, tableNumber: 1, _id: 1 })
    .select('_id');

  if (!table) {
    throw new AppError('No table available for the selected date, time slot, and guests', 409);
  }

  return table;
};

export const createReservation = async (payload) => {
  const normalizedDate = normalizeReservationDate(payload.reservationDate);
  const bookingPayload = {
    customer: payload.customer,
    reservationDate: normalizedDate,
    timeSlot: payload.timeSlot,
    guests: payload.guests,
    status: payload.status || 'confirmed',
  };

  // Retry handles rare race conditions when concurrent requests book the same table.
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const table = await findSmallestAvailableTable({
      guests: bookingPayload.guests,
      reservationDate: bookingPayload.reservationDate,
      timeSlot: bookingPayload.timeSlot,
    });

    try {
      const reservation = await Reservation.create({
        ...bookingPayload,
        table: table._id,
      });

      return Reservation.findById(reservation._id).populate(basePopulate);
    } catch (error) {
      if (isDuplicateReservationError(error) && attempt < maxAttempts) {
        continue;
      }

      throw error;
    }
  }

  throw new AppError('No table available for the selected date, time slot, and guests', 409);
};

export const getReservations = async (currentUser) => {
  const query = currentUser.role === 'admin' ? {} : { customer: currentUser._id };

  const reservations = await Reservation.find(query)
    .populate(basePopulate)
    .sort({ reservationDate: 1, timeSlot: 1 });

  return reservations;
};

export const getReservationById = async (reservationId, currentUser) => {
  const reservation = await Reservation.findById(reservationId).populate(basePopulate);

  if (!reservation) {
    throw new AppError('Reservation not found', 404);
  }

  ensureReservationOwnership(reservation, currentUser);
  return reservation;
};

export const updateReservationById = async (reservationId, payload, currentUser) => {
  const reservation = await Reservation.findById(reservationId).populate(basePopulate);

  if (!reservation) {
    throw new AppError('Reservation not found', 404);
  }

  ensureReservationOwnership(reservation, currentUser);

  if (payload.table) {
    await ensureTableIsAvailable(payload.table);
    reservation.table = payload.table;
  }

  if (payload.reservationDate) {
    reservation.reservationDate = normalizeReservationDate(payload.reservationDate);
  }

  if (payload.timeSlot) {
    reservation.timeSlot = payload.timeSlot;
  }

  if (typeof payload.guests !== 'undefined') {
    reservation.guests = payload.guests;
  }

  if (payload.status) {
    reservation.status = payload.status;
  }

  await ensureNoSlotConflict({
    table: reservation.table,
    reservationDate: reservation.reservationDate,
    timeSlot: reservation.timeSlot,
    excludeId: reservation._id,
  });

  await reservation.save();
  return Reservation.findById(reservation._id).populate(basePopulate);
};

export const deleteReservationById = async (reservationId, currentUser) => {
  const reservation = await Reservation.findById(reservationId).populate(basePopulate);

  if (!reservation) {
    throw new AppError('Reservation not found', 404);
  }

  ensureReservationOwnership(reservation, currentUser);
  await reservation.deleteOne();
};

export const getAdminReservations = async ({ date, page = 1, limit = 10 }) => {
  const parsedPage = Math.max(Number(page) || 1, 1);
  const parsedLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);

  const query = {};
  if (date) {
    const normalizedDate = normalizeReservationDate(date);
    query.reservationDate = normalizedDate;
  }

  const skip = (parsedPage - 1) * parsedLimit;

  const [reservations, total] = await Promise.all([
    Reservation.find(query)
      .populate(basePopulate)
      .sort({ reservationDate: 1, timeSlot: 1, createdAt: -1 })
      .skip(skip)
      .limit(parsedLimit),
    Reservation.countDocuments(query),
  ]);

  return {
    reservations,
    pagination: {
      page: parsedPage,
      limit: parsedLimit,
      total,
      totalPages: Math.max(Math.ceil(total / parsedLimit), 1),
    },
  };
};

export const updateReservationByAdmin = async (reservationId, payload) => {
  const adminContext = { role: 'admin' };
  return updateReservationById(reservationId, payload, adminContext);
};

export const deleteReservationByAdmin = async (reservationId) => {
  const adminContext = { role: 'admin' };
  return deleteReservationById(reservationId, adminContext);
};
