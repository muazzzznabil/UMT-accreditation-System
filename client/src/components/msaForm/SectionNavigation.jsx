import React from "react";
import { Link } from "react-router-dom";

const SectionNavigation = () => {
  return (
    <div className="flex space-x-4 justify-center my-10">
      <Link>Maklumat Program</Link>
      <p>-</p>
      <Link>Kelulusan Mesyuarat JPKT</Link>
      <p>-</p>
      <Link>Kelulusan Mesyuarat JKA</Link>
    </div>
  );
};

export default SectionNavigation;
