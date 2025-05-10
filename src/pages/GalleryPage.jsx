// src/pages/GalleryPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import PhotosTab from './tabs/PhotosTab';
import MyCollectionsTab from './tabs/MyCollectionsTab';
import SharedCollectionsTab from './tabs/SharedCollectionsTab';
import InteractionBar from '../components/InteractionBar';
import '../styles/GalleryPage.css';

const GalleryPage = () => {
  const { user } = useAuth();
  const [activeKey, setActiveKey] = useState('photos');
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [thumbnailSize, setThumbnailSize] = useState(() => {
    const saved = localStorage.getItem('picstr-thumbnail-size');
    return saved ? parseInt(saved, 10) : 250; // Default size: 250px
  });

  // Save thumbnail size preference
  useEffect(() => {
    localStorage.setItem('picstr-thumbnail-size', thumbnailSize.toString());
  }, [thumbnailSize]);

  // Reset selections when changing tabs
  useEffect(() => {
    setSelectedPhotos([]);
  }, [activeKey]);

  // Context-aware props for the interaction bar
  const getInteractionBarProps = () => {
    const commonProps = {
      thumbnailSize,
      setThumbnailSize,
    };

    switch (activeKey) {
      case 'photos':
        return {
          ...commonProps,
          selectedPhotos,
          onClearSelection: () => setSelectedPhotos([]),
          showBulkActions: selectedPhotos.length > 0,
        };

      case 'collections':
        return {
          ...commonProps,
          showCollectionControls: true,
        };

      case 'shared':
        return {
          ...commonProps,
          showSharedControls: true,
        };

      default:
        return commonProps;
    }
  };

  return (
    <Container fluid className="gallery-container">
      <Tab.Container
        id="gallery-tabs"
        activeKey={activeKey}
        onSelect={(k) => setActiveKey(k)}
      >
        <Row>
          <Col xs={12}>
            <Nav variant="tabs" className="gallery-nav">
              <Nav.Item>
                <Nav.Link eventKey="photos">Photos</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="collections">My Collections</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="shared">Shared With Me</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>

        <InteractionBar {...getInteractionBarProps()} />

        <Row>
          <Col xs={12} className="p-0">
            <Tab.Content>
              <Tab.Pane eventKey="photos">
                <PhotosTab
                  thumbnailSize={thumbnailSize}
                  selectedPhotos={selectedPhotos}
                  setSelectedPhotos={setSelectedPhotos}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="collections">
                <MyCollectionsTab thumbnailSize={thumbnailSize} />
              </Tab.Pane>
              <Tab.Pane eventKey="shared">
                <SharedCollectionsTab thumbnailSize={thumbnailSize} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default GalleryPage;
