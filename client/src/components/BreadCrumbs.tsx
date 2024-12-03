import React from "react";

const BreadcrumbsWithIcon = ({ items }) => {
  return (
    <div className="breadcrumbs text-md m-4">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/MsaForm" onClick={(e) => e.preventDefault()}>
            Daftar Permohonan Program
          </a>
        </li>
      </ul>
    </div>
  );
};

export default BreadcrumbsWithIcon; // Default export
