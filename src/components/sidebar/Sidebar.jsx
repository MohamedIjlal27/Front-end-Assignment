import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import LogoBlue from "../../assets/images/logo_blue.svg";
import LogoWhite from "../../assets/images/logo_white.svg";
import {
  MdOutlineClose,
  MdOutlinePeople,
  MdOutlineAdd,
  MdOutlineFolder,
  MdOutlineHelpOutline,
  MdOutlinePersonAdd,
  MdOutlineExpandMore,
  MdOutlineAddCircleOutline,
  MdOutlinePerson,
} from "react-icons/md";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [folders, setFolders] = useState([
    {
      name: "Products",
      subItems: ["Roadmap", "Feedback", "Performance", "Team", "Analytics"],
    },
    { name: "Sales", subItems: ["Leads", "Opportunities", "Closed Deals"] },
    { name: "Design", subItems: ["Wireframes", "Mockups", "Prototypes"] },
    { name: "Office", subItems: [] },
    { name: "Legal", subItems: [] },
  ]);
  const [teams, setTeams] = useState([
    { name: "Design team", members: 3 },
    { name: "Marketing Team", members: 2 },
    { name: "Development Team", members: 3 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [newSubItem, setNewSubItem] = useState("");
  const [addSubItems, setAddSubItems] = useState(false);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);

  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-open-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSubMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleAddFolder = () => {
    setShowModal(true);
    setCurrentFolder(null);
    setIsCreatingTeam(false);
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim() === "") return;

    const newFolder = {
      name: newFolderName,
      subItems: addSubItems ? [] : null,
    };
    setFolders([...folders, newFolder]);
    setShowModal(false);
    setNewFolderName("");
    setAddSubItems(false);
    setActiveMenu(newFolderName);
  };

  const handleAddSubItem = (folderName) => {
    setCurrentFolder(folderName);
    setShowModal(true);
  };

  const handleCreateSubItem = () => {
    if (newSubItem.trim() === "") return;

    setFolders(
      folders.map((folder) =>
        folder.name === currentFolder
          ? { ...folder, subItems: [...folder.subItems, newSubItem] }
          : folder
      )
    );
    setShowModal(false);
    setNewSubItem("");
    setActiveMenu(currentFolder);
  };

  const handleAddTeam = () => {
    setShowModal(true);
    setCurrentFolder(null);
    setIsCreatingTeam(true);
  };

  const handleCreateTeam = () => {
    if (newFolderName.trim() === "") return;

    const newTeam = { name: newFolderName, members: 0 }; // New teams start with 0 members
    setTeams([...teams, newTeam]);
    setShowModal(false);
    setNewFolderName("");
  };

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={theme === LIGHT_THEME ? LogoBlue : LogoWhite} alt="Logo" />
          <span className="sidebar-brand-text">InnovateHub</span>
          <MdOutlinePerson size={24} className="profile-icon" />
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
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
                  {folder.subItems && folder.subItems.length > 0 && (
                    <span
                      className={`menu-link-icon ${
                        activeMenu === folder.name ? "rotate" : ""
                      }`}
                    >
                      <MdOutlineExpandMore size={20} />
                    </span>
                  )}
                </div>
                {activeMenu === folder.name && folder.subItems && (
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
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>
              {isCreatingTeam
                ? "Create Team"
                : currentFolder
                ? "Add Sub-Item"
                : "Create Folder"}
            </h3>
            <input
              type="text"
              value={
                isCreatingTeam
                  ? newFolderName
                  : currentFolder
                  ? newSubItem
                  : newFolderName
              }
              onChange={(e) =>
                isCreatingTeam
                  ? setNewFolderName(e.target.value)
                  : currentFolder
                  ? setNewSubItem(e.target.value)
                  : setNewFolderName(e.target.value)
              }
              placeholder={
                isCreatingTeam
                  ? "Enter team name"
                  : currentFolder
                  ? "Enter sub-item name"
                  : "Enter folder name"
              }
            />
            {!isCreatingTeam && !currentFolder && (
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={addSubItems}
                    onChange={() => setAddSubItems(!addSubItems)}
                  />
                  Add sub-items
                </label>
              </div>
            )}
            <button
              onClick={
                isCreatingTeam
                  ? handleCreateTeam
                  : currentFolder
                  ? handleCreateSubItem
                  : handleCreateFolder
              }
            >
              {isCreatingTeam
                ? "Create Team"
                : currentFolder
                ? "Add Sub-Item"
                : "Create Folder"}
            </button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
