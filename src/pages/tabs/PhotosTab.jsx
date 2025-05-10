// src/pages/tabs/PhotosTab.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import PhotoAlbum from 'react-photo-album';
import CustomLightbox from '../../components/CustomLightbox';
import PhotoUploadZone from '../../components/PhotoUploadZone';
import { getPhotos, getThumbnailUrl, getFullImageUrl } from '../../services/photoService';
import "react-photo-album/styles.css";
import GalleryPhotoAlbum from '../../components/gallery/GalleryPhotoAlbum';

const PhotosTab = ({ thumbnailSize, selectedPhotos, setSelectedPhotos }) => {
  const { user } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load photos
  const loadPhotos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPhotos = await getPhotos();

      // Diagnostic logging
      console.log('API response:', fetchedPhotos);
      console.log('Response type:', typeof fetchedPhotos);
      if (Array.isArray(fetchedPhotos)) {
        console.log('Array length:', fetchedPhotos.length);
        if (fetchedPhotos.length > 0) {
          console.log('First photo sample:', fetchedPhotos[0]);
        }
      } else if (fetchedPhotos && typeof fetchedPhotos === 'object') {
        console.log('Object keys:', Object.keys(fetchedPhotos));
        if (fetchedPhotos.photos && Array.isArray(fetchedPhotos.photos)) {
          console.log('Photos array in response:', fetchedPhotos.photos.length);
          setPhotos(fetchedPhotos.photos);
          return; // Early return if we found the photos array
        }
      }

      // Default handling
      setPhotos(Array.isArray(fetchedPhotos) ? fetchedPhotos : []);
    } catch (err) {
      console.error('Failed to load photos:', err);
      setError('Failed to load photos. Please try again.');
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  // Handle photo click with enhanced debugging
  const handlePhotoClick = (photo, index) => {
    console.log('Opening lightbox for photo:', photo._id || photo.id);
    // Ensure index is valid
    const validIndex = index >= 0 && index < photos.length ? index : 0;
    setCurrentIndex(validIndex);
    setLightboxOpen(true);
  };

  // Handle photo selection
  const handlePhotoSelect = (photo, isSelected) => {
    if (isSelected) {
      setSelectedPhotos(prev => [...prev, photo]);
    } else {
      setSelectedPhotos(prev => prev.filter(p => p.id !== photo.id));
    }
  };

  // Prepare lightbox slides
  const lightboxSlides = useMemo(() => {
    if (!Array.isArray(photos) || photos.length === 0) return [];

    return photos.map(photo => ({
      src: getFullImageUrl(photo),
      width: photo.exif?.resolution?.width || 1200,
      height: photo.exif?.resolution?.height || 800,
      alt: photo.title || 'Photo',
      photo: photo
    }));
  }, [photos]);

  if (loading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading photos...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!photos || !photos.length) {
    return <PhotoUploadZone onPhotosUploaded={loadPhotos} />;
  }

  return (
    <div className="photos-container">
      {/* Use the regular GalleryPhotoAlbum component */}
      <GalleryPhotoAlbum
        photos={photos}
        thumbnailSize={thumbnailSize}
        onPhotoClick={handlePhotoClick}
        onPhotoSelect={handlePhotoSelect}
        selectedPhotos={selectedPhotos}
        currentUserId={user?._id}
      />

      <CustomLightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={currentIndex}
        currentUserId={user?._id}
      />

      <PhotoUploadZone
        onPhotosUploaded={loadPhotos}
        minimized={photos.length > 0}
      />
    </div>
  );
};

export default PhotosTab;
