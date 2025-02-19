// src/pages/SignIn.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/ContextProvider";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      login(response.data.user);
      navigate("/notes");
    } catch (err) {
      alert(err.response.data.msg);
      console.log(err.response);
    } finally {
      setLoading(false);
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          {/* {loading && <div className="text-center mt-3">Loading...</div>} */}
          <div className="text-center mt-2">
            Don't have an account?
            <a href="/signup" className="ms-2">
              SignUp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
