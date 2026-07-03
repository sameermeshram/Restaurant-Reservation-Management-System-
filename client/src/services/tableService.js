import api from "./api";

const TABLES_BASE = "/tables";

export async function fetchTables(params) {
  return api.get(TABLES_BASE, { params });
}

export async function fetchTable(tableId) {
  return api.get(`${TABLES_BASE}/${tableId}`);
}

export async function createTable(data) {
  return api.post(TABLES_BASE, data);
}

export async function updateTable(tableId, data) {
  return api.put(`${TABLES_BASE}/${tableId}`, data);
}

export async function deleteTable(tableId) {
  return api.delete(`${TABLES_BASE}/${tableId}`);
}
