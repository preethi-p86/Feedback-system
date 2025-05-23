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
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 0,
  },
  card: {
    background: "linear-gradient(135deg, #ffffff, #e0f7fa)",
    padding: '40px 60px',
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginBottom: '30px',
    fontSize: '28px',
    fontWeight: '600',
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
    backgroundColor: '#007bff',
    color: '#fff',
    transition: 'all 0.3s ease',
  },
};

export default SelectForm;
