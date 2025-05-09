// src/services/photoService.js
import { API_BASE, apiGet, apiPatch, apiDelete } from './api';

export const fetchPhotos = async () => {
  const res = await apiGet('/photos');
  return res.photos || [];
};

export const uploadPhotos = async (files) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append('photo', file); // must match multer field name
  }

  const res = await fetch(`${API_BASE}/photos/upload`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Upload failed:', errorText);
    throw new Error('Upload failed');
  }
};

export const updatePhoto = (id, data) => apiPatch(`/photos/${id}`, data);
export const deletePhoto = (id) => apiDelete(`/photos/${id}`);

// 🔽 NEW: Helper functions for consistent URL generation
const IMAGE_BASE = import.meta.env.VITE_PUBLIC_IMAGE_URL;

export const getThumbnailUrl = (photo) =>
  `${IMAGE_BASE}/${photo.userId}/thumbs/${photo.thumbnailFilename}`;

export const getFullImageUrl = (photo) =>
  `${IMAGE_BASE}/${photo.userId}/${photo.filename}`;
