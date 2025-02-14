import React from "react";

const About = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">About Notes App</h2>
      <p className="lead text-muted text-center">
        Welcome to <strong>Notes App</strong>, your simple and efficient
        note-taking solution! 🚀
      </p>
      <p>
        We believe that <strong>ideas matter</strong>, and capturing them should
        be <strong>quick, easy, and organized</strong>. Whether you're jotting
        down thoughts, making a to-do list, or saving important information,{" "}
        <strong>Notes App</strong> helps you stay productive and focused.
      </p>
      <h4 className="mt-4">Why Choose Notes App?</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          ✅ <strong>Easy to Use</strong> – A clean and simple interface for
          hassle-free note-taking.
        </li>
        <li className="list-group-item">
          ✅ <strong>Secure & Reliable</strong> – Your notes are stored safely,
          ensuring privacy and accessibility.
        </li>
        <li className="list-group-item">
          ✅ <strong>Search & Organize</strong> – Quickly find what you need
          with powerful search functionality.
        </li>
        <li className="list-group-item">
          ✅ <strong>Access Anywhere</strong> – Save and manage notes on the go,
          anytime, anywhere.
        </li>
      </ul>
      <p className="mt-4 text-center">
        Start capturing your thoughts today and{" "}
        <strong>turn ideas into action!</strong> ✨
      </p>
    </div>
  );
};

export default About;
