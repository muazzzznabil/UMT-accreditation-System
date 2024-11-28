import React from "react";

const BreadcrumbsWithIcon = ({ items }) => {
  return (
    <div className="breadcrumbs text-md m-4">
      <ul>
        <li>
          <a>Home</a>
        </li>
        <li>
          <a>Daftar Permohonan Program</a>
        </li>
      </ul>
    </div>
  );
};

export default BreadcrumbsWithIcon; // Default export
