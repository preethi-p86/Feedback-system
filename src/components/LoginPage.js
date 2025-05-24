// src/components/LoginPage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Firestore

import bgImage from "../assets/login-bg.jpg";
import headerImage from "../assets/only-logo.webp";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  const { username, password } = formData;

  if (!username || !password) {
    setError("Please fill in both fields.");
    return;
  }

  try {
    const q = query(
      collection(db, "users"),
      where("username", "==", username)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setError("User not found.");
      return;
    }

    let valid = false;
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.password === password) {
        valid = true;
      }
    });

    if (valid) {
      setError("");
      navigate("/select-form"); // or your desired route
    } else {
      setError("Incorrect password.");
    }
  } catch (err) {
    console.error("Login error:", err);
    setError("Something went wrong. Try again.");
  }
};

  return (
    <div style={{ ...styles.wrapper, backgroundImage: `url(${bgImage})` }}>
      <div style={styles.overlay}></div>
      <img src={headerImage} alt="Logo" style={styles.headerImage} />

      <div style={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Roll No"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Login</button>
          <div style={styles.forgotContainer}>
            <a href="/forgot-password" style={styles.forgotLink}>Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

// Same styles
const styles = {
  wrapper: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 0,
  },
  headerImage: {
    position: "absolute",
    top: "20px",
    left: "20px",
    height: "130px",
    zIndex: 1,
  },
  container: {
    zIndex: 1,
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "300px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  forgotContainer: {
    textAlign: "right",
    marginTop: "10px",
  },
  forgotLink: {
    fontSize: "14px",
    textDecoration: "none",
    color: "#007bff",
  },
};

export default LoginPage;
