// src/services/api.js
export const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export const apiGet = async (url) => {
  const res = await fetch(`${API_BASE}${url}`, { credentials: 'include' });
  if (!res.ok) throw new Error(`GET ${url} failed`);
  return res.json();
};

export const apiPost = async (url, data) => {
  const res = await fetch(`${API_BASE}${url}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`POST ${url} failed`);
  return res.json();
};

export const apiPatch = async (url, data) => {
  const res = await fetch(`${API_BASE}${url}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`PATCH ${url} failed`);
  return res.json();
};

export const apiDelete = async (url) => {
  const res = await fetch(`${API_BASE}${url}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  if (!res.ok) throw new Error(`DELETE ${url} failed`);
  return res.json();
};
