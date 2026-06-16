import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://localhost:5000/api/v1/auth/signup",
        formData
      );

      alert(res.data.message);

      navigate("/login");

    } catch (error) {
      alert(
        error?.response?.data?.message ||
        "Signup Failed"
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {/* LEFT SIDE */}
      <div
        style={{
          flex: 1,
          background:
            "linear-gradient(135deg,#0F172A,#1E3A8A)",
          color: "white",
          padding: "60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "20px"
          }}
        >
          Join Our
          <br />
          Employee
          <br />
          Platform
        </h1>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "30px"
          }}
        >
          Create your account and start
          managing employees, departments,
          assets and reports efficiently.
        </p>

        <div style={{ marginTop: "40px" }}>
          <p>🚀 Employee Management</p>
          <p>📊 Smart Dashboard</p>
          <p>🔒 Secure Access</p>
          <p>📁 Asset Tracking</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          flex: 1,
          background: "#F8FAFC",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            width: "420px",
            background: "#ffffff",
            padding: "40px",
            borderRadius: "15px",
            boxShadow:
              "0 0 25px rgba(0,0,0,0.1)"
          }}
        >
          <span
            style={{
              background: "#2563EB",
              padding: "8px 15px",
              borderRadius: "20px",
              color: "white",
              fontSize: "12px"
            }}
          >
            CREATE ACCOUNT
          </span>

          <h1
            style={{
              marginTop: "20px",
              color: "#0F172A"
            }}
          >
            Get Started
          </h1>

          <p style={{ color: "#64748B" }}>
            Create your account to continue
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "20px",
                borderRadius: "8px",
                border: "1px solid #CBD5E1"
              }}
            />

            <input
              type="email"
              name="email"
              placeholder="Official Email"
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "15px",
                borderRadius: "8px",
                border: "1px solid #CBD5E1"
              }}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "15px",
                borderRadius: "8px",
                border: "1px solid #CBD5E1"
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "12px",
                border: "none",
                borderRadius: "8px",
                background: "#2563EB",
                color: "white",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              Create Account →
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
              color: "#64748B"
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#2563EB",
                fontWeight: "bold"
              }}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;