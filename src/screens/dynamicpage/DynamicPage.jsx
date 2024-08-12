import React from "react";
import { useParams } from "react-router-dom";

const DynamicPage = () => {
  const { folderName } = useParams();

  return (
    <div>
      <h2>{folderName.charAt(0).toUpperCase() + folderName.slice(1)}</h2>
      <p>This is the {folderName} page.</p>
    </div>
  );
};

export default DynamicPage;
