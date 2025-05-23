import React, { useState } from 'react';

const questions = [
  "How do you rate the internet speed and connectivity on campus?",
  "How do you rate the availability of Wi-Fi in classrooms and common areas?",
  "Are the laboratories equipped with the necessary tools for your coursework?",
  "How do you rate the condition and maintenance of lab equipment?",
  "How comfortable and conducive to learning are the classrooms?",
  "How do you rate the availability of teaching aids like projectors or smart boards?",
  "How do you rate the availability of computers for academic use?",
  "Are the systems well-maintained and updated regularly?",
  "How do you rate the availability of sports facilities and playgrounds?",
  "Are the playground and sports equipment well-maintained?",
  "How do you rate the condition of campus roads and walkways?",
  "Are the water and electricity supplies reliable?",
  "How do you rate the quality of food provided in the canteen?",
  "Are the seating arrangements in the canteen sufficient?",
  "How accessible are campus facilities for differently-abled students?",
  "Are ramps, elevators, and restrooms available and functional?",
  "How do you rate the availability of first aid and medical services on campus?",
  "How accessible are doctors or medical professionals when needed?",
  "Are the facilities for indoor and outdoor games satisfactory?",
  "How do you rate the maintenance of sports equipment?",
  "How do you rate the equipment and maintenance of the gym?",
  "Are the gym timings convenient for student use?",
  "How do you rate the library infrastructure (seating, lighting, and environment)?",
  "Are the operating hours of the library convenient?",
  "How do you rate the availability of books, e-resources, and journals?",
  "How do you rate the variety of clubs available for extracurricular activities?",
  "Are there sufficient facilities to conduct club activities effectively?",
  "How do you rate the support provided by the college for club activities and events?",
  "How do you rate the availability of self-learning resources (MOOC, SWAYAM-NPTEL, etc.)?",
  "Are these resources effectively promoted and accessible?",
  "How do you rate the availability of printing and photocopying services?",
  "Are these services affordable and reliable?",
  "How do you rate the accessibility of banking facilities, including ATMs, on campus?",
  "Are these facilities sufficient to meet your needs?",
  "How do you rate the efficiency of processes like fee payment, attendance, and scholarship applications?",
  "Are the administrative staff approachable and helpful?",
  "How do you rate the cleanliness and maintenance of restrooms on campus?",
  "Are there enough restrooms available to meet student needs?",
];

const FacilitiesFeedback = () => {
  const [formData, setFormData] = useState({
    year: '',
    responses: Array(questions.length).fill(null),
    suggestion: ''
  });

  const handleInputChange = (index, value) => {
    const updatedResponses = [...formData.responses];
    updatedResponses[index] = value;
    setFormData({ ...formData, responses: updatedResponses });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // handle form submission here
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.header}>Facilities Feedback Form</h2>

      <div style={styles.rowContainer}>

      <label style={{ ...styles.label, ...styles.halfWidth }}>
        Year of Study <span className="text-danger">*</span>
        <input
          type="text"
          required
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          style={styles.input}
        />
      </label>
      </div>

      {questions.map((question, index) => (
        <div key={index} style={styles.questionBlock}>
          <p style={styles.question}>
            {question} <span className='text-danger'>*</span>
          </p>
          <div style={styles.radioGroup}>
            {[5, 4, 3, 2, 1].map((value) => (
              <label key={value} style={styles.radioLabel}>
                <input
                  type="radio"
                  name={`q${index}`}
                  value={value}
                  checked={formData.responses[index] === value}
                  onChange={() => handleInputChange(index, value)}
                  required
                  style={styles.radio}
                />
                {value}
              </label>
            ))}
          </div>
        </div>
      ))}

      <div style={{ marginTop: '20px' }}>
        <label htmlFor="suggestions" style={{ fontWeight: 'bold', color: '#003366' }}>
          Additional Suggestions <span className='text-danger'>*</span>
        </label>
        <br />
        <textarea
          id="suggestions"
          style={{
            width: '100%',
            height: '100px',
            borderRadius: '10px',
            padding: '10px',
            fontSize: '16px',
            marginTop: '5px'
          }}
          required
          value={formData.suggestions}
          onChange={(e) => setFormData({ ...formData, suggestions: e.target.value })}
        />

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            type="submit"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '10px 20px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Submit
          </button>
        </div>

      </div>


    </form>
  );
};

const styles = {
  rowContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap:'20px',
    marginBottom: '20px'
  },

  halfWidth: {
    flex: '1'
  },

  form: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    fontFamily: 'sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '15px'
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px'
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    marginTop: '5px',
    resize: 'vertical',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px'
  },
  buttonContainer: {
    marginTop: '20px',
    textAlign: 'center'
  },

  questionBlock: {
    marginBottom: '20px',
    backgroundColor: '#fff',
    padding: '10px 15px',
    borderRadius: '6px'
  },
  question: {
    marginBottom: '8px'
  },
  radioGroup: {
    display: 'flex',
    gap: '10px'
  },
  radioLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '14px'
  },
  radio: {
    marginBottom: '4px',
    width: '18px',
    height: '18px'
  },
  button: {
    display: 'block',
    margin: '30px auto 0',
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  }
};

export default FacilitiesFeedback;
