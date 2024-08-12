import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import "./BaseLayout.scss";

const BaseLayout = () => {
  const [selectedTitle, setSelectedTitle] = useState("Dashboard");

  return (
    <div className="base-layout">
      <Header selectedTitle={selectedTitle} />
      <main className="page-wrapper">
        {/* left of page */}
        <Sidebar setSelectedTitle={setSelectedTitle} />
        {/* right side/content of the page */}
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default BaseLayout;
