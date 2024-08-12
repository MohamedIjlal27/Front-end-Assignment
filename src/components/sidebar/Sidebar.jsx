import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import LogoBlue from "../../assets/images/logo_blue.svg";
import LogoWhite from "../../assets/images/logo_white.svg";
import { MdOutlineClose } from "react-icons/md";
import { SidebarContext } from "../../context/SidebarContext";

import SidebarTop from "../sidebartop/SidebarTop";
import SidebarBody from "../sidebarbody/SidebarBody";
import Modal from "../modal/Modal";
import { useNavigate } from "react-router-dom";
import "../Sidebar.scss";

const Sidebar = ({ setSelectedTitle }) => {
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
    { name: "Office", subItems: null },
    { name: "Legal", subItems: null },
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

  const navigate = useNavigate();

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
    setSelectedTitle(menu); // Update the selected title
    navigate(`/${menu.toLowerCase()}`);
  };

  const handleAddFolder = () => {
    setShowModal(true);
    setCurrentFolder(null);
    setIsCreatingTeam(false);
  };

  const handleCreateFolder = () => {
    const newFolder = {
      name: newFolderName,
      subItems: addSubItems ? [] : null,
    };
    setFolders([...folders, newFolder]);
    setNewFolderName("");

    if (addSubItems) {
      setCurrentFolder(newFolderName);
      setNewSubItem("");
    } else {
      setShowModal(false);
      setAddSubItems(false); // Reset the checkbox state
    }
  };

  const handleAddSubItem = (folderName) => {
    setCurrentFolder(folderName);
    setShowModal(true);
  };

  const handleCreateSubItem = () => {
    setFolders(
      folders.map((folder) =>
        folder.name === currentFolder
          ? { ...folder, subItems: [...folder.subItems, newSubItem] }
          : folder
      )
    );
    setShowModal(false);
    setNewSubItem("");
  };

  const handleAddTeam = () => {
    setShowModal(true);
    setCurrentFolder(null);
    setIsCreatingTeam(true);
  };

  const handleCreateTeam = () => {
    setTeams([...teams, { name: newFolderName, members: 0 }]);
    setShowModal(false);
    setNewFolderName("");
  };

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <SidebarTop
        theme={theme}
        LogoBlue={LogoBlue}
        LogoWhite={LogoWhite}
        closeSidebar={closeSidebar}
      />
      <SidebarBody
        activeMenu={activeMenu}
        folders={folders}
        teams={teams}
        toggleSubMenu={toggleSubMenu}
        handleAddFolder={handleAddFolder}
        handleAddSubItem={handleAddSubItem}
        handleAddTeam={handleAddTeam}
      />
      {showModal && (
        <Modal
          isCreatingTeam={isCreatingTeam}
          currentFolder={currentFolder}
          newFolderName={newFolderName}
          newSubItem={newSubItem}
          addSubItems={addSubItems}
          setNewFolderName={setNewFolderName}
          setNewSubItem={setNewSubItem}
          setAddSubItems={setAddSubItems}
          handleCreateFolder={handleCreateFolder}
          handleCreateSubItem={handleCreateSubItem}
          handleCreateTeam={handleCreateTeam}
          setShowModal={setShowModal}
        />
      )}
    </nav>
  );
};

export default Sidebar;
