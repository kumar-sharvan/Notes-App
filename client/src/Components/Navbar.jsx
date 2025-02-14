import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./ContextProvider";

const Navbar = ({ setSearchQuery }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // useNavigate inside a Router context

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect after logout
  };

  return (
    <div>
      <nav className="navbar bg-dark">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand text-light">Notes Taking App</a>

          <form className="d-flex mx-auto">
            <input
              className="form-control form-control-sm me-2"
              type="search"
              placeholder="Search notes..."
              aria-label="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <div className="d-flex align-items-center">
            {!user ? (
              <>
                <Link to="/signin" className="btn btn-primary fw-bold me-2">
                  Login
                </Link>
                <Link to="/contact" className="btn btn-warning fw-bold">
                  Contact
                </Link>
              </>
            ) : (
              <>
                <span className="text-warning me-3 fw-bold fs-5">
                  {user.username}
                </span>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
