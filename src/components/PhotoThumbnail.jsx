// src/components/PhotoThumbnail.jsx
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { BsStar, BsStarFill, BsHeart, BsHeartFill, BsPencil, BsCollection, BsTag } from 'react-icons/bs';
import HeartBurstOverlay from './HeartBurstOverlay';
import { getThumbnailUrl } from '../services/photoService';
import '../styles/PhotoThumbnail.css';

const PhotoThumbnail = ({
  photo,
  liked = false,
  favorited = false,
  selected = false,
  isOwner = true,
  onLike,
  onFavorite,
  onSelect,
  onClick,
  onEdit,
  onAddToCollection,
  onAddTags,
  width,
  height,
  imageProps = {}
}) => {
  const [showControls, setShowControls] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Calculate icon size based on thumbnail size (height)
  const getIconSize = () => {
    const size = parseInt(height, 10);
    if (isNaN(size)) return 16; // default

    if (size <= 150) return 14;
    if (size <= 250) return 16;
    return 18;
  };

  const iconSize = getIconSize();

  // Direct click handler without event object
  const handleClick = () => {
    onClick?.();
  };

  // Handle like with animation
  const handleLike = (e) => {
    e.stopPropagation();
    if (!liked) {
      setShowHeartAnimation(true);
      setTimeout(() => setShowHeartAnimation(false), 1000);
    }
    onLike?.();
  };

  // Handle favorite
  const handleFavorite = (e) => {
    e.stopPropagation();
    onFavorite?.();
  };

  // Handle selection
  const handleSelect = (e) => {
    e.stopPropagation();
    onSelect?.();
  };

  // Handle edit
  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit?.();
  };

  // Handle add to collection
  const handleAddToCollection = (e) => {
    e.stopPropagation();
    onAddToCollection?.();
  };

  // Handle add tags
  const handleAddTags = (e) => {
    e.stopPropagation();
    onAddTags?.();
  };

  return (
    <div
      className={`photo-thumbnail ${selected ? 'selected' : ''} ${showControls ? 'hover-active' : ''}`}
      style={{ width, height }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onClick={handleClick}
      data-testid="photo-thumbnail"
    >
      <img
        src={getThumbnailUrl(photo)}
        alt={photo.title || 'Photo'}
        draggable="false"
        loading="lazy"
        decoding="async"
        onLoad={() => setImageLoaded(true)}
        className={imageLoaded ? 'loaded' : ''}
        onContextMenu={(e) => e.preventDefault()}
        {...imageProps}
      />

      {/* Add a placeholder while the image loads */}
      {!imageLoaded && <div className="image-placeholder"></div>}

      {/* Selection checkbox */}
      <div className="photo-checkbox">
        <Form.Check
          type="checkbox"
          checked={selected}
          onChange={handleSelect}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Favorite/Like control in top right */}
      {isOwner ? (
        <div className="favorite-control">
          <button
            onClick={handleFavorite}
            className={`icon-btn ${favorited ? 'favorited' : ''}`}
          >
            {favorited ? <BsStarFill size={iconSize} /> : <BsStar size={iconSize} />}
          </button>
        </div>
      ) : (
        <div className="like-control">
          <button
            onClick={handleLike}
            className={`icon-btn ${liked ? 'liked' : ''}`}
          >
            {liked ? <BsHeartFill size={iconSize} /> : <BsHeart size={iconSize} />}
          </button>
        </div>
      )}

      {/* Bottom controls bar */}
      <div className="bottom-controls">
        <button onClick={handleEdit} className="icon-btn">
          <BsPencil size={iconSize} />
        </button>
        <button onClick={handleAddToCollection} className="icon-btn">
          <BsCollection size={iconSize} />
        </button>
        <button onClick={handleAddTags} className="icon-btn">
          <BsTag size={iconSize} />
        </button>
      </div>

      {/* Heart animation overlay */}
      {showHeartAnimation && <HeartBurstOverlay />}

      {/* Clickable overlay to ensure clicks are captured */}
      <div className="click-overlay"></div>
    </div>
  );
};

export default PhotoThumbnail;
