import api from "./api";

const RESERVATIONS_BASE = "/reservations";

export async function fetchReservations(params) {
  return api.get(RESERVATIONS_BASE, { params });
}

export async function fetchMyReservations() {
  return api.get(`${RESERVATIONS_BASE}/my`);
}

export async function fetchReservation(reservationId) {
  return api.get(`${RESERVATIONS_BASE}/${reservationId}`);
}

export async function createReservation(data) {
  return api.post(RESERVATIONS_BASE, data);
}

export async function updateReservation(reservationId, data) {
  return api.put(`${RESERVATIONS_BASE}/${reservationId}`, data);
}

export async function cancelReservation(reservationId) {
  return api.delete(`${RESERVATIONS_BASE}/${reservationId}`);
}

export async function fetchAdminReservations(params) {
  return api.get(`/admin/reservations`, { params });
}

export async function updateAdminReservation(reservationId, data) {
  return api.put(`/admin/reservations/${reservationId}`, data);
}

export async function cancelAdminReservation(reservationId) {
  return api.delete(`/admin/reservations/${reservationId}`);
}
