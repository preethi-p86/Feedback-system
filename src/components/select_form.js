// src/pages/SelectForm.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from "../assets/login-bg.jpg";

const SelectForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSyllabiClick = () => {
    navigate('/teacher-select');
  };

  const handleFacilitiesClick = () => {
    navigate('/facilities-feedback');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUserId');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.card}>
        <h1 style={styles.title}>Select the Form that you would like to fill</h1>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={handleSyllabiClick}>
            Students Feedback on Syllabi
          </button>
          <button style={styles.button} onClick={handleFacilitiesClick}>
            Students Feedback on Facilities
          </button>
        </div>
        <button
          onClick={handleLogout}
          style={{
            marginTop: '30px',
            backgroundColor: '#E53935',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(229, 57, 53, 0.3)',
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 0,
  },
  card: {
    background: "linear-gradient(135deg, #ffffff, #f5f7fa)",
    padding: '40px 60px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backdropFilter: 'blur(6px)',
  },
  title: {
    marginBottom: '30px',
    fontSize: '30px',
    fontWeight: '700',
    color: '#3F51B5',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    padding: '15px 25px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#3F51B5',
    color: '#ffffff',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(63, 81, 181, 0.3)',
  },
};

export default SelectForm;
