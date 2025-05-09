// src/components/PhotoUploadZone.jsx
import React, { useRef, useState, useEffect } from 'react';
import { uploadPhotos } from '../services/photoService';

const PhotoUploadZone = ({ onUploadComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef();
  let dragCounter = 0;

  const handleFileInputChange = async (e) => {
    const files = Array.from(e.target.files);
    await uploadPhotos(files);
    onUploadComplete();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    dragCounter = 0;
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    await uploadPhotos(files);
    onUploadComplete();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const handleDragEnter = (e) => {
      e.preventDefault();
      dragCounter++;
      setIsDragging(true);
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      dragCounter--;
      if (dragCounter === 0) setIsDragging(false);
    };

    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleFileInputChange}
      />

      {isDragging && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.4)',
            color: '#fff',
            fontSize: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          Drop photos to upload
        </div>
      )}
    </>
  );
};

export default PhotoUploadZone;
