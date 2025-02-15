// src/pages/SignIn.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate , Link} from "react-router-dom";
import { useAuth } from "../Components/ContextProvider";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://notes-app-3v4s.onrender.com/api/users/signin",
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      login(response.data.user); // Ensure response.data.user includes name
      navigate("/notes");
    } catch (err) {
      alert(err.response.data.msg);
      console.log(err.response);
    }
  };

  return (
    <div>
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-dark">
        <div className="card p-4 shadow" style={{ width: "30rem" }}>
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <div className="text-center mt-2">
            Don't have an account?
            <Link to="/signup" className="ms-2">
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
