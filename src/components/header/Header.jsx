import React from "react";
import "./Header.scss";

const Header = ({ selectedTitle }) => {
  return (
    <header className="header">
      <h1 className="header-title">{selectedTitle}</h1>
      <div className="header-right">
        <div className="search-container">
          <i className="fas fa-search icon-search"></i>
          <input type="text" className="search-bar" placeholder="Search..." />
        </div>
        <i className="fas fa-envelope icon-message"></i>
        <i className="fas fa-cog icon-settings"></i>
      </div>
    </header>
  );
};

export default Header;
