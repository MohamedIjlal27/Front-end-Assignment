import { useContext, useEffect, useRef, useState } from "react";
import {
  MdOutlineDesignServices,
  MdOutlineBusinessCenter,
  MdOutlineGavel,
  MdOutlineBusiness,
  MdOutlinePeople,
  MdOutlineCampaign,
  MdOutlineCode,
} from "react-icons/md";
import LogoBlue from "../../assets/images/logo_blue.svg";
import LogoWhite from "../../assets/images/logo_white.svg";
import { SidebarContext } from "../../context/SidebarContext";

import SidebarTop from "../sidebartop/SidebarTop";
import SidebarBody from "../sidebarbody/SidebarBody";
import Modal from "../modal/Modal";
import { useNavigate } from "react-router-dom";
import "../Sidebar.scss";

const Sidebar = ({ setSelectedTitle }) => {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);

  const [activeMenu, setActiveMenu] = useState(null);
  const [folders, setFolders] = useState([
    {
      name: "Products",
      icon: MdOutlineBusiness,
      subItems: ["Roadmap", "Feedback", "Performance", "Team", "Analytics"],
    },
    {
      name: "Sales",
      icon: MdOutlineBusinessCenter,
      subItems: ["Leads", "Opportunities", "Closed Deals"],
    },
    {
      name: "Design",
      icon: MdOutlineDesignServices,
      subItems: ["Wireframes", "Mockups", "Prototypes"],
    },
    { name: "Office", icon: MdOutlineBusiness, subItems: null },
    { name: "Legal", icon: MdOutlineGavel, subItems: null },
  ]);
  const [teams, setTeams] = useState([
    { name: "Design team", icon: MdOutlineDesignServices, members: 3 },
    { name: "Marketing Team", icon: MdOutlineCampaign, members: 2 },
    { name: "Development Team", icon: MdOutlineCode, members: 3 },
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
    setSelectedTitle(menu);
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
      setAddSubItems(false);
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
