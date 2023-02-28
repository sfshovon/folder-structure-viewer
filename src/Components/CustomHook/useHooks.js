import { faCaretDown, faCaretRight, faFolder, faFolderOpen, faPlus, faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const useHooks = () => {
  //States
  const [folders, setFolders] = useState([{ 
    id: 1, 
    name: 'root', 
    parent: '', 
    isOpen: true 
  }]);
  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [parentId, setParentId] = useState('');

  //Functions
  const handleModalOpen = (id) => {
    setParentId(id);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFolderName('');
    setParentId(''); 
  };

  const handleFolderNameChange = (event) => {
    setFolderName(event.target.value);
  };

  const handleAddFolder = () => {
    if (folderName.trim() === '') {
      alert('Folder name cannot be empty');
      return;
    }
    const newFolder = {
      id: Date.now(),
      name: folderName,
      parent: parentId,
      isOpen: true
    };
    setFolders([...folders, newFolder]);
    handleModalClose();
  };

  const handleDeleteFolder = (folderId) => {
    const folderToDelete = folders.find(folder => folder.id === folderId);
    if (!window.confirm(`Are you sure you want to delete the folder "${folderToDelete.name}"?`)) {
      return;
    }
    setFolders(folders.filter(folder => folder.id !== folderId));
  };

  const handleToggleFolder = (folderId) => {
    setFolders(folders.map(folder => {
      if (folder.id === folderId) {
        return { 
          ...folder, 
          isOpen: !folder.isOpen 
        };
      } 
      else {
        return folder;
      }
    }));
  };

  const renderFolders = (parentId) => { 
    return folders.filter(folder => folder.parent === parentId).map(folder => {
      const hasSubfolders = folders.some(f => f.parent === folder.id);
      return (
        <div className="folder" key={folder.id}>
          <div className="folder-header">
            {hasSubfolders && (
              <div className="toggle-button" onClick={() => handleToggleFolder(folder.id)}>
                <FontAwesomeIcon icon={folder.isOpen ? faCaretRight : faCaretDown} />
              </div>
            )}
            <FontAwesomeIcon icon={folder.isOpen ? faFolderOpen : faFolder} onClick={() => handleToggleFolder(folder.id)} />
            <span>{folder.name}</span>
            <div className="buttons-container">
              { folder.id !== 1 && (
                  <FontAwesomeIcon onClick={() => handleDeleteFolder(folder.id)}  className="delete-button" icon={faRemove} />   
                )
              }
              <button className="add-button" onClick={() => handleModalOpen(folder.id)}>
                <FontAwesomeIcon icon={faPlus} /> New
              </button>
            </div>
          </div>
          {hasSubfolders && folder.isOpen && (
            <div className="subfolders">{renderFolders(folder.id)}</div>
          )}
          {!hasSubfolders && folder.isOpen && (
            <div className="no-subfolders">No Folder</div>
          )}
        </div>
      );
    });
  };
  
  return {
    folders, setFolders, showModal, setShowModal, folderName, setFolderName, parentId, setParentId, handleModalOpen, handleModalClose, handleFolderNameChange, handleAddFolder, handleDeleteFolder,handleToggleFolder, renderFolders
  }
};

export default useHooks;