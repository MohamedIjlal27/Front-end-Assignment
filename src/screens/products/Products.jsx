import React, { useState } from "react";
import {
  FaChevronDown,
  FaSearch,
  FaEnvelope,
  FaCog,
  FaPlus,
  FaCommentDots,
} from "react-icons/fa";
import "./Products.scss";
import tableData from "./tableData";

const Products = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleCheckboxChange = (brandName) => {
    setSelectedBrands((prevSelected) =>
      prevSelected.includes(brandName)
        ? prevSelected.filter((name) => name !== brandName)
        : [...prevSelected, brandName]
    );
  };

  const brandCount = tableData.length;

  return (
    <div className="products-page">
      <div className="header-container">
        <div className="title-container">
          <h1 className="products-title">Products</h1>
          <div className="header-right">
            <div className="search-container">
              <FaSearch className="icon-search" />
              <input
                type="text"
                className="search-bar"
                placeholder="Search..."
              />
            </div>
            <FaEnvelope className="icon-message" />
            <FaCog className="icon-settings" />
          </div>
        </div>
        <div className="dropdown-container">
          <div className="dropdown-wrapper">
            <select className="dropdown">
              <option value="all-brands">All brands</option>
              <option value="brand1">Brand 1</option>
              <option value="brand2">Brand 2</option>
              {/* Add more options as needed */}
            </select>
            <FaChevronDown className="dropdown-icon" />
          </div>
          <div className="dropdown-wrapper">
            <select className="dropdown">
              <option value="desk">Desk</option>
              <option value="desk1">Desk 1</option>
              <option value="desk2">Desk 2</option>
              {/* Add more options as needed */}
            </select>
            <FaChevronDown className="dropdown-icon" />
          </div>
          <div className="dropdown-wrapper">
            <select className="dropdown">
              <option value="tags">Tags</option>
              <option value="tag1">Tag 1</option>
              <option value="tag2">Tag 2</option>
              {/* Add more options as needed */}
            </select>
            <FaChevronDown className="dropdown-icon" />
          </div>
        </div>
        <div className="table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>
                  Brand <FaPlus className="add-brand-icon" />
                </th>
                <th>Description</th>
                <th>Members</th>
                <th>Categories</th>
                <th>Tags</th>
                <th>Next meeting</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => {
                const BrandIcon = row.brand;
                return (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(row.name)}
                        onChange={() => handleCheckboxChange(row.name)}
                      />
                    </td>
                    <td>
                      {BrandIcon && (
                        <BrandIcon
                          className="brand-icon"
                          style={{ color: row.color }}
                        />
                      )}{" "}
                      {row.name}
                      <span className="message-count">
                        <FaCommentDots /> {row.messages}
                      </span>
                    </td>
                    <td>{row.description}</td>
                    <td>
                      <div className="members-container">
                        {row.members.map((member, memberIndex) => (
                          <img
                            key={memberIndex}
                            src={member}
                            alt={`Member ${memberIndex + 1}`}
                            className="member-avatar"
                          />
                        ))}
                      </div>
                    </td>
                    <td>{row.categories}</td>
                    <td>{row.tags}</td>
                    <td>{row.nextMeeting}</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="1" className="brand-count">
                  {brandCount} count
                </td>
                <td colSpan="1" className="add-calculation">
                  <FaPlus className="add-calculation-icon" /> Add calculation
                </td>
                <td colSpan="1" className="add-calculation">
                  <FaPlus className="add-calculation-icon" /> Add calculation
                </td>
                <td colSpan="1" className="add-calculation">
                  <FaPlus className="add-calculation-icon" /> Add calculation
                </td>
                <td colSpan="1" className="add-calculation">
                  <FaPlus className="add-calculation-icon" /> Add calculation
                </td>
                <td colSpan="1" className="add-calculation">
                  <FaPlus className="add-calculation-icon" /> Add calculation
                </td>
                <td colSpan="1" className="add-calculation">
                  <FaPlus className="add-calculation-icon" /> Add calculation
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="content-area"></div>
    </div>
  );
};

export default Products;
