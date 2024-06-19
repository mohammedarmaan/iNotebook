import { React, useEffect } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const handleSignout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("uname");
    navigate("/");
    navigate(0);         // reloads the page
  };

  return (
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">
        iNotebook
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              aria-current="page"
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              to="/about"
            >
              About
            </Link>
          </li>
        </ul>
        {localStorage.getItem('token') ? (
          <div className="d-flex align-items-center">
            <span className="navbar-text text-white me-3">
              Welcome, {localStorage.getItem('uname')}
            </span>
            <button
              className="btn btn-outline-danger mx-2"
              type="button"
              onClick={handleSignout}
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="d-flex">
            <Link
              to="/signup"
              className={`btn ${location.pathname === '/signup' ? 'btn-primary' : 'btn-outline-primary'} mx-2`}
            >
              Sign up
            </Link>
            <Link
              to="/signin"
              className={`btn ${location.pathname === '/signin' ? 'btn-primary' : 'btn-outline-primary'} mx-2`}
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  </nav>
  );
};
export default Navbar;
