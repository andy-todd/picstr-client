// src/pages/tabs/PhotosTab.jsx
import React, { useEffect, useState } from 'react';
import { fetchPhotos } from '../../services/photoService';
import GalleryGrid from '../../components/GalleryGrid.jsx';

const PhotosTab = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const data = await fetchPhotos();
        setPhotos(Array.isArray(data) ? data : []); // ✅ guard for safety
      } catch (err) {
        console.error('Failed to fetch photos', err);
        setPhotos([]); // prevent map error
      }
    };

    loadPhotos();
  }, []);

  return <GalleryGrid items={photos} type="photo" />;
};

export default PhotosTab;
