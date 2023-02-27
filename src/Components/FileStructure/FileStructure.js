
import React from 'react';
import useHooks from '../CustomHook/useHooks';
import './FileStructure.css';

const FileStructure = () => {
  const { showModal,  folderName, handleModalClose, 
    handleFolderNameChange, handleAddFolder, renderFolders } = useHooks();

  return (
    <div>
      <header className="app-header">
        <h1>Folder Structure</h1>
      </header>
      
      <div className="folders-container">{renderFolders(null)}</div>
      
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-title">
              <span>New Folder</span>
            </div>
            <div className="modal-body">
              <label htmlFor="folder-name">Folder Name</label>
              <input type="text" id="folder-name" value={folderName} placeholder="Folder name" onChange={handleFolderNameChange} />
            </div>
            <div className="modal-footer">
            <button className="cancel-button" onClick={handleModalClose}>
                Cancel
              </button>
              <button className="create-button" onClick={handleAddFolder}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileStructure;