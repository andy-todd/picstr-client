// src/pages/tabs/MyCollectionsTab.jsx
import React from 'react';
import { Card } from 'react-bootstrap';

const MyCollectionsTab = ({ thumbnailSize }) => {
  return (
    <div className="p-4">
      <Card className="text-center p-5">
        <Card.Body>
          <Card.Title>My Collections</Card.Title>
          <Card.Text>
            This feature is coming soon. You'll be able to create and manage collections of your photos.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyCollectionsTab;
