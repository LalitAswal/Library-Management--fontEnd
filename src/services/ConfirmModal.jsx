// src/components/common/ConfirmModal.jsx
import React from 'react';
import './common.css';

const ConfirmModal = ({ show, title, message, onConfirm, onCancel }) => {
  if (!show) return null;
  console.table({ show, title, message, onConfirm, onCancel });
  return (
    <div className="confirm-modal-backdrop">
      <div className="confirm-modal">
        <h3>{title || 'Confirm Action'}</h3>
        <p>{message || 'Are you sure?'}</p>
        <div className="confirm-modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>
            Yes
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
