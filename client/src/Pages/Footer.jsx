import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4">
            <h5>Notes App</h5>
            <p className="text-light">
              Capture and organize your thoughts easily.
            </p>
          </div>

          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/notes" className="text-light text-decoration-none">
                  My Notes
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-light text-decoration-none">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light text-decoration-none">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center gap-3">
              <a href="#" className="text-light">
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/sharvan-kumar-443263320/ "
                className="text-light"
                target={"_blank"}
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://github.com/kumar-sharvan"
                className="text-light"
                target="_blank"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-light mt-4" />
        <h4 className="">Made with ❤️ By Sharvan Pandit</h4>
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Notes App. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
