// src/components/gallery/CustomPhotoRenderer.jsx
import React from 'react';
import PhotoThumbnail from '../PhotoThumbnail';
import { updatePhoto } from '../../services/photoService';

const CustomPhotoRenderer = ({
  photo,
  imageProps,
  layout,
  selectedPhotos = [],
  onSelect,
  currentUserId
}) => {
  // Get the original photo data we attached
  const originalPhoto = photo.photo;
  if (!originalPhoto) return null;

  const photoId = originalPhoto._id || originalPhoto.id;
  const isSelected = selectedPhotos.some(p => (p._id || p.id) === photoId);
  const isOwner = originalPhoto.userId === currentUserId;

  // Handle like/favorite in the renderer since we need the original photo data
  const handleLike = async () => {
    try {
      await updatePhoto(photoId, { liked: true });
    } catch (error) {
      console.error('Failed to like photo:', error);
    }
  };

  const handleFavorite = async () => {
    try {
      await updatePhoto(photoId, { isFavorite: !originalPhoto.isFavorite });
    } catch (error) {
      console.error('Failed to favorite photo:', error);
    }
  };

  return (
    <PhotoThumbnail
      photo={originalPhoto}
      liked={originalPhoto.likes?.includes(currentUserId)}
      favorited={originalPhoto.isFavorite}
      selected={isSelected}
      isOwner={isOwner}
      onLike={handleLike}
      onFavorite={handleFavorite}
      onSelect={() => onSelect?.(originalPhoto, !isSelected)}
      // onClick is handled by InfiniteScroll component
      width={layout.width}
      height={layout.height}
      imageProps={imageProps}
    />
  );
};

export default CustomPhotoRenderer;
