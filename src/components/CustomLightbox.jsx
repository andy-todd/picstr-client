import React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { BsHeart, BsHeartFill, BsStar, BsStarFill } from 'react-icons/bs';
import { updatePhoto } from '../services/photoService';
import '../styles/CustomLightbox.css';

const CustomLightbox = ({
  open,
  close,
  slides = [],
  index = 0,
  currentUserId
}) => {
  // Handle like/favorite actions in lightbox
  const handleActionClick = async (photo, action) => {
    if (!photo || !photo._id) return;

    try {
      const newValue = action === 'like'
        ? !photo.likes?.includes(currentUserId)
        : !photo.isFavorite;

      const updateData = action === 'like'
        ? { liked: newValue }
        : { isFavorite: newValue };

      await updatePhoto(photo._id, updateData);

      // In a real implementation, you might want to update the state
      // to reflect the changes in the UI immediately
    } catch (error) {
      console.error(`Failed to ${action} photo:`, error);
    }
  };

  // Custom slide header to add controls inside lightbox
  const renderSlideHeader = ({ slide }) => {
    const photo = slide?.photo;
    if (!photo) return null;

    const isOwnPhoto = photo.userId === currentUserId;
    const isLiked = photo.likes?.includes(currentUserId) || false;
    const isFavorited = photo.isFavorite || false;

    return (
      <div className="lightbox-controls">
        {/* Like button - only for photos user doesn't own */}
        {!isOwnPhoto && (
          <button
            onClick={() => handleActionClick(photo, 'like')}
            className={`lightbox-action-btn ${isLiked ? 'liked' : ''}`}
          >
            {isLiked ? <BsHeartFill size={20} /> : <BsHeart size={20} />}
          </button>
        )}

        {/* Favorite button - only for user's own photos */}
        {isOwnPhoto && (
          <button
            onClick={() => handleActionClick(photo, 'favorite')}
            className={`lightbox-action-btn ${isFavorited ? 'favorited' : ''}`}
          >
            {isFavorited ? <BsStarFill size={20} /> : <BsStar size={20} />}
          </button>
        )}
      </div>
    );
  };

  // Safety check for empty slides
  if (!slides || !Array.isArray(slides) || slides.length === 0) {
    return null;
  }

  return (
    <Lightbox
      open={open}
      close={close}
      slides={slides}
      index={index}
      render={{ slideHeader: renderSlideHeader }}
      carousel={{ finite: slides.length <= 1 }}
      animation={{ fade: 300, swipe: 200 }}
      controller={{
        closeOnBackdropClick: true,
        closeOnPullDown: true
      }}
    />
  );
};

export default CustomLightbox;
