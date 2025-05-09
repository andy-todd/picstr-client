// src/components/CustomLightbox.jsx
import React, { useState, useEffect } from 'react';
import Lightbox, { IconButton, useLightboxState } from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { FaHeart, FaRegHeart, FaStar, FaRegStar } from 'react-icons/fa';
import HeartBurstOverlay from './HeartBurstOverlay';
import { getFullImageUrl } from '../services/photoService';

const LikeButton = ({ liked, onLike }) => {
  const { currentSlide } = useLightboxState();
  return (
    <IconButton
      label="Like"
      icon={liked ? FaHeart : FaRegHeart}
      onClick={onLike}
      disabled={!currentSlide}
    />
  );
};

const FavoriteButton = ({ favorited, onFavorite }) => {
  const { currentSlide } = useLightboxState();
  return (
    <IconButton
      label="Favorite"
      icon={favorited ? FaStar : FaRegStar}
      onClick={onFavorite}
      disabled={!currentSlide}
    />
  );
};

const CustomLightbox = ({
  onClose,
  photo,
  liked,
  favorited,
  onLike,
  onFavorite
}) => {
  const [triggerHeart, setTriggerHeart] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log('🌟 CustomLightbox mounted with photo:', photo);

    // Short delay to ensure component is fully mounted
    const timer = setTimeout(() => {
      console.log('🌟 Setting lightbox to open state');
      setIsOpen(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [photo]);

  if (!photo) {
    console.error('❌ CustomLightbox rendered without photo data');
    return null;
  }

  console.log('🖼️ Creating slide with photo:', photo);

  const imageUrl = getFullImageUrl(photo);
  console.log('🖼️ Full image URL:', imageUrl);

  const slides = [
    {
      src: imageUrl,
      alt: photo.title || '',
    }
  ];

  const handleLike = () => {
    console.log('❤️ Like button clicked');
    onLike?.();
    setTriggerHeart(Date.now());
  };

  const handleClose = () => {
    console.log('🚪 Lightbox closing');
    setIsOpen(false);

    // Short delay to allow animation to complete
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  return (
    <>
      <HeartBurstOverlay trigger={triggerHeart} />
      <Lightbox
        open={isOpen}
        close={handleClose}
        slides={slides}
        plugins={[Zoom]}
        toolbar={{
          buttons: [
            <LikeButton key="like" liked={liked} onLike={handleLike} />,
            <FavoriteButton key="fav" favorited={favorited} onFavorite={onFavorite} />,
            'zoom-in',
            'zoom-out',
            'close',
          ],
        }}
        render={{
          buttonPrev: () => null,  // Hide prev button for single image
          buttonNext: () => null,  // Hide next button for single image
        }}
      />
    </>
  );
};

export default CustomLightbox;
