// src/components/InteractionBar.jsx
import React from 'react';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import { BsFilter, BsFunnel, BsGrid, BsListUl } from 'react-icons/bs';
import '../styles/InteractionBar.css';

const InteractionBar = ({
  thumbnailSize = 250,
  setThumbnailSize,
  selectedPhotos = [],
  onClearSelection,
  showBulkActions = false,
  showCollectionControls = false,
  showSharedControls = false
}) => {
  // Handle thumbnail size change
  const handleSizeChange = (value) => {
    setThumbnailSize(parseInt(value, 10));
  };

  return (
    <div className="interaction-bar">
      <div className="interaction-controls">
        {/* Left side: Sort/Filter controls */}
        <div className="left-controls">
          <Button variant="outline-secondary" className="control-btn">
            <BsFunnel className="me-1" /> Sort
          </Button>
          <Button variant="outline-secondary" className="control-btn">
            <BsFilter className="me-1" /> Filter
          </Button>
          <Button variant="outline-secondary" className="control-btn">
            <BsGrid className="me-1" /> Group
          </Button>
        </div>

        {/* Center: Bulk actions (conditional) */}
        <div className="center-controls">
          {showBulkActions && (
            <div className="bulk-actions">
              <ButtonGroup size="sm" className="me-2">
                <Button variant="primary">Add to Collection</Button>
                <Button variant="primary">Add Tags</Button>
                <Button variant="danger">Delete</Button>
              </ButtonGroup>
              <Button
                variant="link"
                size="sm"
                onClick={onClearSelection}
                className="text-muted"
              >
                Clear ({selectedPhotos.length})
              </Button>
            </div>
          )}

          {showCollectionControls && (
            <ButtonGroup size="sm">
              <Button variant="primary">Set Privacy</Button>
              <Button variant="outline-primary">Edit Details</Button>
            </ButtonGroup>
          )}
        </div>

        {/* Right side: Thumbnail size */}
        <div className="right-controls">
          <div className="size-control">
            <span className="size-label">Size:</span>
            <Form.Range
              min={100}
              max={400}
              step={50}
              value={thumbnailSize}
              onChange={(e) => handleSizeChange(e.target.value)}
              className="size-slider"
            />
            <span className="size-value">{thumbnailSize}px</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractionBar;
