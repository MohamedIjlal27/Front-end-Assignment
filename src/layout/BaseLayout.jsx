import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import "./BaseLayout.scss";

const BaseLayout = () => {
  return (
    <div className="base-layout">
      <Header />
      <main className="page-wrapper">
        {/* left of page */}
        <Sidebar />
        {/* right side/content of the page */}
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default BaseLayout;
