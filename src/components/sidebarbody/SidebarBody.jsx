import React from "react";
import {
  MdOutlinePeople,
  MdOutlineFolder,
  MdOutlineAdd,
  MdOutlineAddCircleOutline,
  MdOutlineExpandMore,
  MdOutlinePersonAdd,
  MdOutlineHelpOutline,
} from "react-icons/md";
import { Link } from "react-router-dom";

const SidebarBody = ({
  activeMenu,
  folders,
  teams,
  toggleSubMenu,
  handleAddFolder,
  handleAddSubItem,
  handleAddTeam,
}) => {
  return (
    <div className="sidebar-body">
      <div className="sidebar-section">
        <ul className="menu-list">
          {teams.map((team, index) => (
            <li className="menu-item" key={index}>
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlinePeople size={20} />
                </span>
                <span className="menu-link-text">{team.name}</span>
                <span className="menu-link-badge">{team.members}</span>
              </Link>
            </li>
          ))}
          <li className="menu-item">
            <div className="menu-link" onClick={handleAddTeam}>
              <span className="menu-link-icon">
                <MdOutlineAdd size={20} />
              </span>
              <span className="menu-link-text">Create a team</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="sidebar-section">
        <h4 className="sidebar-section-title">
          FOLDERS
          <MdOutlineAddCircleOutline
            size={20}
            className="add-folder-icon"
            onClick={handleAddFolder}
          />
        </h4>
        <ul className="menu-list">
          {folders.map((folder, index) => (
            <li className="menu-item" key={index}>
              <div
                className="menu-link"
                onClick={() => toggleSubMenu(folder.name)}
              >
                <span className="menu-link-icon">
                  <MdOutlineFolder size={20} />
                </span>
                <span className="menu-link-text">{folder.name}</span>
                {Array.isArray(folder.subItems) &&
                  folder.subItems.length > 0 && (
                    <span
                      className={`menu-link-icon ${
                        activeMenu === folder.name ? "rotate" : ""
                      }`}
                    >
                      <MdOutlineExpandMore size={20} />
                    </span>
                  )}
              </div>
              {activeMenu === folder.name && Array.isArray(folder.subItems) && (
                <ul className="submenu-list">
                  {folder.subItems.map((subItem, subIndex) => (
                    <li className="submenu-item" key={subIndex}>
                      {subItem}
                    </li>
                  ))}
                  <li
                    className="submenu-item add-sub-item"
                    onClick={() => handleAddSubItem(folder.name)}
                  >
                    <span className="submenu-item-icon">
                      <MdOutlineAdd size={20} />
                    </span>
                    Add new sub
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-section">
        <ul className="menu-list">
          <li className="menu-item">
            <Link to="/" className="menu-link">
              <span className="menu-link-icon">
                <MdOutlinePersonAdd size={20} />
              </span>
              <span className="menu-link-text">Invite teammates</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/" className="menu-link">
              <span className="menu-link-icon">
                <MdOutlineHelpOutline size={20} />
              </span>
              <span className="menu-link-text">Help and first steps</span>
              <span className="menu-link-badge">0/6</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-section sidebar-footer">
        <div className="trial-info">
          <span className="sidebar-footer-text">7 days left on trial</span>
          <button className="sidebar-footer-button">Add Billing</button>
        </div>
      </div>
    </div>
  );
};

export default SidebarBody;
