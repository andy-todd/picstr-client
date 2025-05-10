// src/services/photoService.js
import { API_BASE, apiGet, apiPatch, apiDelete } from './api';

// Base URL for images from environment variables
const IMAGE_BASE = import.meta.env.VITE_PUBLIC_IMAGE_URL;

/**
 * Get photos for the current user
 * @returns {Promise} Promise with the photos data
 */
export const getPhotos = async () => {
  const res = await apiGet('/photos');
  return res.photos || [];
};

/**
 * Get a specific photo by ID
 * @param {string} id Photo ID
 * @returns {Promise} Promise with the photo data
 */
export const getPhoto = async (id) => {
  return apiGet(`/photos/${id}`);
};

/**
 * Get archived photos for the current user
 * @returns {Promise} Promise with the archived photos data
 */
export const getArchivedPhotos = async () => {
  const res = await apiGet('/photos/archived');
  return res.photos || [];
};

/**
 * Get liked photos for the current user
 * @returns {Promise} Promise with the liked photos data
 */
export const getLikedPhotos = async () => {
  const res = await apiGet('/photos/liked');
  return res.photos || [];
};

/**
 * Upload photos
 * @param {Array} files Array of files to upload
 * @returns {Promise} Promise with the upload result
 */
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

/**
 * Update a photo
 * @param {string} id Photo ID
 * @param {Object} data Update data
 * @returns {Promise} Promise with the updated photo
 */
export const updatePhoto = (id, data) => apiPatch(`/photos/${id}`, data);

/**
 * Delete a photo (move to archive)
 * @param {string} id Photo ID
 * @returns {Promise} Promise with result
 */
export const deletePhoto = (id) => apiDelete(`/photos/${id}`);

/**
 * Generate thumbnail URL for a photo
 * @param {Object} photo Photo object
 * @returns {string} Thumbnail URL
 */
export const getThumbnailUrl = (photo) => {
  if (!photo) return '';
  if (photo.thumbnailFilename) {
    return `${IMAGE_BASE}/${photo.userId}/thumbs/${photo.thumbnailFilename}`;
  }
  return `${IMAGE_BASE}/${photo.userId}/${photo.filename}`;
};

/**
 * Generate full image URL for a photo
 * @param {Object} photo Photo object
 * @returns {string} Full image URL
 */
export const getFullImageUrl = (photo) => {
  if (!photo) return '';
  return `${IMAGE_BASE}/${photo.userId}/${photo.filename}`;
};

/**
 * Like a photo
 * @param {string} id Photo ID
 * @returns {Promise} Promise with result
 */
export const likePhoto = async (id) => {
  return apiPatch(`/photos/${id}/like`, { liked: true });
};

/**
 * Unlike a photo
 * @param {string} id Photo ID
 * @returns {Promise} Promise with result
 */
export const unlikePhoto = async (id) => {
  return apiPatch(`/photos/${id}/like`, { liked: false });
};

/**
 * Add tags to a photo
 * @param {string} id Photo ID
 * @param {Array} tags Tags to add
 * @returns {Promise} Promise with result
 */
export const addTags = async (id, tags) => {
  return apiPatch(`/photos/${id}/tags`, { tags });
};

/**
 * Remove a tag from a photo
 * @param {string} id Photo ID
 * @param {string} tag Tag to remove
 * @returns {Promise} Promise with result
 */
export const removeTag = async (id, tag) => {
  return apiDelete(`/photos/${id}/tags/${tag}`);
};

export default {
  getPhotos,
  getPhoto,
  getArchivedPhotos,
  getLikedPhotos,
  uploadPhotos,
  updatePhoto,
  deletePhoto,
  getThumbnailUrl,
  getFullImageUrl,
  likePhoto,
  unlikePhoto,
  addTags,
  removeTag
};
