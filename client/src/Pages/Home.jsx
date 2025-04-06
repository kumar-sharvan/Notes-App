import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { FaPlusCircle } from "react-icons/fa";
import Footer from "./Footer";
import home from "../assets/home-right.png";

const Home = () => {
  return (
    <>
      <Navbar />{" "}
      <div className="container d-flex flex-column justify-content-center align-items-center text-center min-vh-100">
        <h1 className="fw-bold mb-3">Welcome to Your Notes App</h1>
        <p className="text-muted">
          Capture your thoughts, ideas, and tasks in one place.
        </p>

        <div className="mt-4">
          <img
            src={home}
            alt="Notebook Illustration"
            className="img-fluid rounded shadow"
            style={{ width: "100%", maxWidth: "600px", height: "auto" }}
          />
        </div>

        <div className="mt-4">
          <Link
            to="/signup"
            className="btn btn-primary btn-lg d-flex align-items-center gap-2"
          >
            <FaPlusCircle size={20} /> Add Your First Note
          </Link>
        </div>

        <blockquote className="blockquote mt-4">
          <p className="fst-italic">
            “The palest ink is better than the best memory.”
          </p>
          <footer className="blockquote-footer">Chinese Proverb</footer>
        </blockquote>
      </div>
      <Footer />
    </>
  );
};

export default Home;
