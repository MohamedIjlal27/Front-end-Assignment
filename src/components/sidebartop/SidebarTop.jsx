import React from "react";
import { MdOutlineClose, MdOutlinePerson } from "react-icons/md";

const SidebarTop = ({ theme, LogoBlue, LogoWhite, closeSidebar }) => {
  return (
    <div className="sidebar-top">
      <div className="sidebar-brand">
        <img src={LogoBlue} alt="Logo" className="sidebar-logo" />
        <div className="sidebar-brand-text-container">
          <span className="sidebar-brand-inc">INC</span>
          <span className="sidebar-brand-text">InnovateHub</span>
        </div>
        <MdOutlinePerson size={24} className="profile-icon" />
      </div>
      <button className="sidebar-close-btn" onClick={closeSidebar}>
        <MdOutlineClose size={24} />
      </button>
    </div>
  );
};

export default SidebarTop;
