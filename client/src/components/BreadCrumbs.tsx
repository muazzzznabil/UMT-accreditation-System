import { Link, useLocation, useNavigate } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the path and split it into parts
  const pathParts = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm breadcrumbs ">
      <ul className="flex ">
        <li>
          <Link to="/" className="text-white-500 hover:underline text-lg">
            Home
          </Link>
        </li>
        {pathParts.map((part, index) => {
          const routeTo = `/${pathParts.slice(0, index + 1).join("/")}`;
          const isLast = index === pathParts.length - 1;

          return (
            <li key={index} className="flex items-center">
              <span className=""></span>
              {isLast ? (
                <span className="text-white-500 text-lg">{part}</span>
              ) : (
                <button
                  onClick={() => navigate(routeTo)}
                  className="text-white-500 hover:underline text-lg"
                >
                  {part}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
