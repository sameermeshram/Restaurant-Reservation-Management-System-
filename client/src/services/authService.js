import api from "./api";

const AUTH_BASE = "/auth";

export async function login(credentials) {
  return api.post(`${AUTH_BASE}/login`, credentials);
}

export async function register(user) {
  return api.post(`${AUTH_BASE}/register`, user);
}

export async function getMe() {
  return api.get(`${AUTH_BASE}/me`);
}

export async function logout() {
  return Promise.resolve();
}
