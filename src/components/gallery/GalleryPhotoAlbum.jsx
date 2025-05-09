// src/components/gallery/GalleryPhotoAlbum.jsx
import React, { useState } from 'react';
import PhotoAlbum from 'react-photo-album';
import PhotoThumbnail from '../PhotoThumbnail';
import { getThumbnailUrl, getFullImageUrl } from '../../services/photoService';
import { updatePhoto } from '../../services/photoService';

const GalleryPhotoAlbum = ({ photos }) => {
  const [likedPhotos, setLikedPhotos] = useState({});
  const [favoritedPhotos, setFavoritedPhotos] = useState({});

  // Prepare photos for react-photo-album format
  const formattedPhotos = photos.map(photo => ({
    src: getThumbnailUrl(photo),
    width: photo.width || 800,
    height: photo.height || 600,
    key: photo.id,
    photo: photo, // Attach the original photo object
  }));

  const handleLike = async (photo) => {
    console.log('💖 Liking photo:', photo.id);
    const newValue = !likedPhotos[photo.id];

    setLikedPhotos(prev => ({
      ...prev,
      [photo.id]: newValue
    }));

    try {
      await updatePhoto(photo.id, { liked: newValue });
    } catch (error) {
      console.error('Failed to update like status:', error);
      // Revert if API call fails
      setLikedPhotos(prev => ({
        ...prev,
        [photo.id]: !newValue
      }));
    }
  };

  const handleFavorite = async (photo) => {
    console.log('⭐ Favoriting photo:', photo.id);
    const newValue = !favoritedPhotos[photo.id];

    setFavoritedPhotos(prev => ({
      ...prev,
      [photo.id]: newValue
    }));

    try {
      await updatePhoto(photo.id, { favorited: newValue });
    } catch (error) {
      console.error('Failed to update favorite status:', error);
      // Revert if API call fails
      setFavoritedPhotos(prev => ({
        ...prev,
        [photo.id]: !newValue
      }));
    }
  };

  // Custom renderer for PhotoAlbum
  const renderPhoto = ({ photo, layout }) => {
    // Extract the original photo object from our formatted photo
    const originalPhoto = photo.photo;

    return (
      <PhotoThumbnail
        photo={originalPhoto}
        liked={likedPhotos[originalPhoto.id]}
        favorited={favoritedPhotos[originalPhoto.id]}
        onLike={() => handleLike(originalPhoto)}
        onFavorite={() => handleFavorite(originalPhoto)}
        width={layout.width}
        height={layout.height}
      />
    );
  };

  if (!photos || photos.length === 0) {
    return <div className="p-4 text-center">No photos to display</div>;
  }

  return (
    <PhotoAlbum
      layout="rows"
      photos={formattedPhotos}
      renderPhoto={renderPhoto}
      spacing={8}
      padding={0}
      targetRowHeight={250}
    />
  );
};

export default GalleryPhotoAlbum;
