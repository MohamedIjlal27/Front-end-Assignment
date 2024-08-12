import React from "react";
import { useLocation } from "react-router-dom";
import "../Sidebar.scss";

const Header = () => {
  const location = useLocation();
  const getTitle = () => {
    switch (location.pathname) {
      case "/products":
        return "Products";
      case "/sales":
        return "Sales";
      case "/design":
        return "Design";
      case "/office":
        return "Office";
      case "/legal":
        return "Legal";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="header">
      <h1 className="header-title">{getTitle()}</h1>
    </header>
  );
};

export default Header;
