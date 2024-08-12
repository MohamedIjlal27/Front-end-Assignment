import React from "react";
import "../Sidebar.scss";

const Modal = ({
  isCreatingTeam,
  currentFolder,
  newFolderName,
  newSubItem,
  addSubItems,
  setNewFolderName,
  setNewSubItem,
  setAddSubItems,
  handleCreateFolder,
  handleCreateSubItem,
  handleCreateTeam,
  setShowModal,
}) => {
  const handleCloseModal = () => {
    setShowModal(false);
    setAddSubItems(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>
          {isCreatingTeam
            ? "Create a Team"
            : currentFolder
            ? `Add a sub to ${currentFolder}`
            : "Create a Folder"}
        </h2>
        {!isCreatingTeam && !currentFolder && (
          <>
            <label>
              Folder Name:
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
            </label>
            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={addSubItems}
                onChange={(e) => setAddSubItems(e.target.checked)}
              />
              <label>Add sub-items</label>
            </div>
            <button onClick={handleCreateFolder}>Create</button>
          </>
        )}
        {currentFolder && (
          <>
            <label>
              Sub-Item Name:
              <input
                type="text"
                value={newSubItem}
                onChange={(e) => setNewSubItem(e.target.value)}
              />
            </label>
            <button onClick={handleCreateSubItem}>Add Sub-Item</button>
          </>
        )}
        {isCreatingTeam && (
          <>
            <label>
              Team Name:
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
            </label>
            <button onClick={handleCreateTeam}>Create Team</button>
          </>
        )}
        <button onClick={handleCloseModal}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
