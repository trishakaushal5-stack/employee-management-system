import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
        "https://loginapp-backend-2chc.onrender.com/api/v1/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {
      alert(
        error?.response?.data?.message ||
        "Login Failed"
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
            "linear-gradient(135deg,#2563EB,#60A5FA)",
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
          Employee
          <br />
          Management
          <br />
          System
        </h1>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "30px"
          }}
        >
          Manage employees, departments,
          skills, assets and leaves from
          one centralized dashboard.
        </p>

        <div style={{ marginTop: "40px" }}>
          <p>✅ Secure Authentication</p>
          <p>✅ Employee Management</p>
          <p>✅ Asset Tracking</p>
          <p>✅ Leave Management</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          flex: 1,
          background: "#0F172A",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            width: "400px",
            background: "#1E293B",
            padding: "40px",
            borderRadius: "15px",
            boxShadow:
              "0 0 20px rgba(0,0,0,0.3)"
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
            ADMIN PORTAL
          </span>

          <h1
            style={{
              color: "white",
              marginTop: "20px"
            }}
          >
            Welcome Back
          </h1>

          <p style={{ color: "#94A3B8" }}>
            Sign in to access your dashboard
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Official Email"
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "20px",
                borderRadius: "8px",
                border: "none"
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
                border: "none"
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
              Access Dashboard →
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
              color: "#94A3B8"
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "#60A5FA"
              }}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;