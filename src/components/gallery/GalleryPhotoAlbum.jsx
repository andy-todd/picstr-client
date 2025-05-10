// src/components/gallery/GalleryPhotoAlbum.jsx
import React, { useState, useEffect, useRef } from 'react';
import PhotoThumbnail from '../PhotoThumbnail';
import { getThumbnailUrl, updatePhoto } from '../../services/photoService';
import '../../styles/GalleryPhotoAlbum.css';

const GalleryPhotoAlbum = ({
  photos = [],
  thumbnailSize = 250,
  onPhotoClick,
  onPhotoSelect,
  selectedPhotos = [],
  currentUserId
}) => {
  const [likedPhotos, setLikedPhotos] = useState({});
  const [favoritedPhotos, setFavoritedPhotos] = useState({});
  const [columns, setColumns] = useState(4);
  const [visiblePhotos, setVisiblePhotos] = useState([]);
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  // Initialize liked/favorited states from photos
  useEffect(() => {
    const likedMap = {};
    const favoritedMap = {};

    // Ensure photos is an array before mapping
    if (Array.isArray(photos)) {
      photos.forEach(photo => {
        if (photo) {
          const photoId = photo._id || photo.id;
          if (photoId) {
            likedMap[photoId] = photo.likes?.includes(currentUserId) || false;
            favoritedMap[photoId] = photo.isFavorite || false;
          }
        }
      });
    }

    setLikedPhotos(likedMap);
    setFavoritedPhotos(favoritedMap);
  }, [photos, currentUserId]);

  // Calculate columns based on container width and thumbnail size
  useEffect(() => {
    const calculateColumns = () => {
      if (!containerRef.current) return;

      const spacing = 16; // Gap between photos
      const containerWidth = containerRef.current.clientWidth;

      // Calculate columns based on thumbnail size to match mockup grid
      let calculatedColumns;
      if (thumbnailSize <= 150) {
        calculatedColumns = Math.floor(containerWidth / 150);
      } else if (thumbnailSize <= 250) {
        calculatedColumns = Math.floor(containerWidth / 250);
      } else {
        calculatedColumns = Math.floor(containerWidth / 350);
      }

      setColumns(Math.max(2, calculatedColumns));
    };

    // Initial calculation
    calculateColumns();

    // Recalculate on window resize
    const handleResize = () => {
      calculateColumns();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [thumbnailSize]);

  // Setup lazy loading with Intersection Observer
  useEffect(() => {
    // Initialize visible photos with first batch
    const initialVisibleCount = Math.min(20, photos.length);
    setVisiblePhotos(photos.slice(0, initialVisibleCount));

    // Set up lazy loading for remaining photos
    const options = {
      rootMargin: '200px', // Load images before they're visible
      threshold: 0.1
    };

    const handleIntersection = (entries) => {
      if (entries[0].isIntersecting && visiblePhotos.length < photos.length) {
        const nextBatch = Math.min(20, photos.length - visiblePhotos.length);
        setVisiblePhotos(prev => [
          ...prev,
          ...photos.slice(prev.length, prev.length + nextBatch)
        ]);
      }
    };

    if (photos.length > initialVisibleCount) {
      observerRef.current = new IntersectionObserver(handleIntersection, options);

      // Observe the last visible element
      if (containerRef.current) {
        const lastElement = containerRef.current.lastElementChild;
        if (lastElement) {
          observerRef.current.observe(lastElement);
        }
      }
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [photos]);

  // Handle like action
  const handleLike = async (photo) => {
    if (!photo) return;
    const photoId = photo._id || photo.id;
    if (!photoId) return;

    const newValue = !likedPhotos[photoId];

    // Optimistic update
    setLikedPhotos(prev => ({
      ...prev,
      [photoId]: newValue
    }));

    try {
      await updatePhoto(photoId, { liked: newValue });
    } catch (error) {
      console.error('Failed to update like status:', error);
      // Revert on failure
      setLikedPhotos(prev => ({
        ...prev,
        [photoId]: !newValue
      }));
    }
  };

  // Handle favorite action
  const handleFavorite = async (photo) => {
    if (!photo) return;
    const photoId = photo._id || photo.id;
    if (!photoId) return;

    const newValue = !favoritedPhotos[photoId];

    // Optimistic update
    setFavoritedPhotos(prev => ({
      ...prev,
      [photoId]: newValue
    }));

    try {
      await updatePhoto(photoId, { isFavorite: newValue });
    } catch (error) {
      console.error('Failed to update favorite status:', error);
      // Revert on failure
      setFavoritedPhotos(prev => ({
        ...prev,
        [photoId]: !newValue
      }));
    }
  };

  // Directly handle photo click
  const handlePhotoClick = (photo, index) => {
    if (onPhotoClick) {
      onPhotoClick(photo, index);
    }
  };

  // Fallback if no photos
  if (!photos || !Array.isArray(photos) || photos.length === 0) {
    return <div className="text-center p-4">No photos to display</div>;
  }

  // Create photo grid
  const getPhotoRows = () => {
    const rows = [];
    for (let i = 0; i < visiblePhotos.length; i += columns) {
      rows.push(visiblePhotos.slice(i, i + columns));
    }
    return rows;
  };

  return (
    <div className="gallery-photo-album" ref={containerRef}>
      {getPhotoRows().map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="photo-row">
          {row.map((photo, colIndex) => {
            const index = photos.findIndex(p => (p._id || p.id) === (photo._id || photo.id));
            const photoId = photo._id || photo.id;
            const isSelected = selectedPhotos.some(p => (p._id || p.id) === photoId);
            const isOwner = photo.userId === currentUserId;

            return (
              <div
                key={photoId || `photo-${index}`}
                className="photo-cell"
                style={{
                  width: `${100 / columns}%`,
                }}
              >
                <div
                  className="photo-container"
                  style={{
                    height: `${thumbnailSize}px`,
                  }}
                >
                  <PhotoThumbnail
                    photo={photo}
                    liked={likedPhotos[photoId]}
                    favorited={favoritedPhotos[photoId]}
                    selected={isSelected}
                    isOwner={isOwner}
                    onLike={() => handleLike(photo)}
                    onFavorite={() => handleFavorite(photo)}
                    onSelect={() => onPhotoSelect?.(photo, !isSelected)}
                    onClick={() => handlePhotoClick(photo, index)}
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
            );
          })}
        </div>
      ))}
      {/* Lazy loading sentinel */}
      {visiblePhotos.length < photos.length && (
        <div className="lazy-load-sentinel" ref={el => {
          if (el && observerRef.current) {
            observerRef.current.observe(el);
          }
        }} style={{ height: '10px', width: '100%' }}></div>
      )}
    </div>
  );
};

export default GalleryPhotoAlbum;
