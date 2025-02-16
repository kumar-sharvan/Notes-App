import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./ContextProvider";

const Navbar = ({ setSearchQuery }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          📖 Notes App
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          {/* Search Bar (Centered on Larger Screens) */}
          <form className="d-flex mx-auto my-2 my-lg-0">
            <input
              className="form-control form-control-sm me-2"
              type="search"
              placeholder="Search notes..."
              aria-label="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Right Section (Login, Contact, or User Info) */}
          <ul className="navbar-nav ms-auto">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link to="/signin" className="btn btn-primary fw-bold me-2 mb-2">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="btn btn-warning fw-bold">
                    Contact
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item d-flex align-items-center">
                  <span className="text-warning me-3 fw-bold fs-5">
                    {user.username}
                  </span>
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
