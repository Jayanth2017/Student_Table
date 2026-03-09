import React from 'react';
import './ConfirmationDialog.css';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        <div className="dialog-content">
          <p className="dialog-message">{message}</p>
          <div className="dialog-actions">
            <button className="dialog-cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button className="dialog-confirm-btn" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;