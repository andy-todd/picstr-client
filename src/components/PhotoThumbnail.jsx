// src/components/PhotoThumbnail.jsx
import React from 'react';
import { useModalContext } from '../contexts/ModalContext';
import CustomLightbox from './CustomLightbox';
import { getThumbnailUrl } from '../services/photoService';

const PhotoThumbnail = ({
  photo,
  liked,
  favorited,
  onLike,
  onFavorite,
  onClick,
  width = '100%',
  height = 'auto',
}) => {
  const { openModal } = useModalContext();

  const handleClick = (e) => {
    console.log('📸 Thumbnail clicked!', photo);

    // Ensure we have a valid photo object
    if (!photo || !photo.userId || !photo.filename) {
      console.error('❌ Invalid photo object:', photo);
      return;
    }

    if (onClick) {
      console.log('🔀 Using provided onClick handler');
      onClick();
    } else {
      console.log('🔍 Opening modal with CustomLightbox');
      openModal(CustomLightbox, {
        photo,
        liked,
        favorited,
        onLike,
        onFavorite
      });
    }
  };

  // Ensure we have a valid photo before trying to get URL
  if (!photo || !photo.userId || !photo.thumbnailFilename) {
    console.error('❌ Invalid photo in PhotoThumbnail:', photo);
    return <div className="photo-thumbnail error">Invalid photo data</div>;
  }

  const thumbUrl = getThumbnailUrl(photo);
  console.log('🖼️ Rendering thumbnail with URL:', thumbUrl);

  return (
    <div
      className="photo-thumbnail"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={thumbUrl}
        alt={photo.title || 'Photo'}
        style={{ width, height }}
        loading="lazy"
      />
    </div>
  );
};

export default PhotoThumbnail;
