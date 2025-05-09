import React, { useEffect, useState } from 'react';
import { fetchPhotos } from '../services/photoService';
import PhotoUploadZone from '../components/PhotoUploadZone';
import GalleryPhotoAlbum from '../components/gallery/GalleryPhotoAlbum';
import { ModalProvider } from '../contexts/ModalContext';
import { useAuth } from '../contexts/AuthContext';

const GalleryPage = () => {
  const { user, isLoading } = useAuth();
  const [photos, setPhotos] = useState([]);

  const loadPhotos = async () => {
    const data = await fetchPhotos();
    setPhotos(data);
  };

  useEffect(() => {
    if (!isLoading && user) {
      loadPhotos();
    }
  }, [isLoading, user]);

  return (
    <ModalProvider>
      <div className="container mt-4">
        <PhotoUploadZone onUploadComplete={loadPhotos} />
        <h2>Gallery</h2>
        <GalleryPhotoAlbum photos={photos} />
      </div>
    </ModalProvider>
  );
};

export default GalleryPage;
