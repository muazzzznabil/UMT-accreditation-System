// src/utils/getBreadcrumbs.js
import { useLocation } from "react-router-dom";

export const useBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return pathnames.map((pathname, index) => {
    const path = `/${pathnames.slice(0, index + 1).join("/")}`;

    return {
      label: pathname.charAt(0).toUpperCase() + pathname.slice(1), // Capitalize first letter
      path,
      isActive: index === pathnames.length - 1,
      // You can add icons or any other properties here
    };
  });
};
