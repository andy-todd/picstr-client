// src/contexts/ModalContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);
  const [modalProps, setModalProps] = useState({});

  // Debug effect to monitor state changes
  useEffect(() => {
    if (modal) {
      console.log('🔵 Modal component set:', modal.name || 'Anonymous Component');
      console.log('🔵 Modal props:', modalProps);
    }
  }, [modal, modalProps]);

  const openModal = (component, props = {}) => {
    console.log('📣 openModal CALLED WITH:', component?.name || '[unknown]');
    console.log('📣 Props:', props);

    if (typeof component !== 'function') {
      console.error('❌ openModal() received invalid component:', component);
      return;
    }

    // Ensure photo object is valid if provided
    if (props?.photo && (!props.photo.userId || !props.photo.filename)) {
      console.error('❌ Invalid photo object in modal props:', props.photo);
      return;
    }

    setModalProps(props);
    setModal(() => component);
  };

  const closeModal = () => {
    console.log('🚪 Closing modal');
    setModal(null);
    setModalProps({});
  };

  // Create the element or null - with extra validation
  const modalElement = modal ? (
    <div className="modal-wrapper" style={{ position: 'relative', zIndex: 1000 }}>
      {React.createElement(modal, {
        ...modalProps,
        onClose: closeModal
      })}
    </div>
  ) : null;

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalElement}
    </ModalContext.Provider>
  );
};
