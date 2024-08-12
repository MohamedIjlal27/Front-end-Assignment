import React from "react";
import "../Sidebar.scss";

const Header = ({ selectedTitle }) => {
  return (
    <header className="header">
      <h1 className="header-title">{selectedTitle}</h1>
    </header>
  );
};

export default Header;
