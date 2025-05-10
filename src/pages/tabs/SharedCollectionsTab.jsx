// src/pages/tabs/SharedCollectionsTab.jsx
import React from 'react';
import { Card } from 'react-bootstrap';

const SharedCollectionsTab = ({ thumbnailSize }) => {
  return (
    <div className="p-4">
      <Card className="text-center p-5">
        <Card.Body>
          <Card.Title>Shared Collections</Card.Title>
          <Card.Text>
            This feature is coming soon. You'll be able to view collections that others have shared with you.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SharedCollectionsTab;
