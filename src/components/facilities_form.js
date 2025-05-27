// src/pages/FacilitiesFeedback.js
import React, { useState, useEffect } from 'react';
import './FacilitiesFeedback.css';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const questions = [
  "How do you rate the internet speed and connectivity on campus?",
  "How satisfied are you with the availability of computers and technical equipment?",
  "How well are the classroom facilities maintained?",
  "How comfortable and suitable are the study areas and common rooms?",
  "Are the restroom facilities adequate and well-maintained?",
  "How would you rate the availability and quality of library resources?",
  "Are the sports and recreational facilities satisfactory?",
  "How effective is the campus security?",
  "How clean and well-maintained is the campus environment?",
  "Are the cafeteria and dining facilities up to your expectations?"
];

const FacilitiesFeedback = () => {
  const [formData, setFormData] = useState({
    year: '',
    responses: Array(questions.length).fill(null),
    suggestions: ''
  });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('loggedInUserId');
    setUserId(storedUserId);
  }, []);

  const handleInputChange = (index, value) => {
    const updatedResponses = [...formData.responses];
    updatedResponses[index] = value;
    setFormData({ ...formData, responses: updatedResponses });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allAnswered = formData.responses.every(response => response !== null);

    if (!formData.year || !formData.suggestions || !allAnswered) {
      alert("Please fill in all required fields including year, suggestions, and all feedback questions.");
      return;
    }

    if (!userId) {
      alert("You must be logged in to submit feedback.");
      return;
    }

    try {
      await addDoc(collection(db, 'facilitiesFeedback'), {
        ...formData,
        userId,
        submittedAt: Timestamp.now()
      });

      alert('Feedback submitted successfully!');
      setFormData({
        year: '',
        responses: Array(questions.length).fill(null),
        suggestions: ''
      });
    } catch (error) {
      console.error("Error writing document: ", error);
      alert('Failed to submit feedback. Please try again.');
    }
  };

  if (!userId) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>You must be logged in to access this form.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-header">Facilities Feedback Form</h2>

      <div className="row-container">
        <label className="half-width label">
          Year of Study <span className="text-danger">*</span>
          <input
            type="text"
            required
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="input-field"
          />
        </label>
      </div>

      {questions.map((question, index) => (
        <div key={index} className="question-block">
          <p className="question-text">
            {question} <span className="text-danger">*</span>
          </p>
          <div className="radio-group">
            {[5, 4, 3, 2, 1].map((value) => (
              <label key={value} className="radio-label">
                <input
                  type="radio"
                  name={`q${index}`}
                  value={value}
                  checked={formData.responses[index] === value}
                  onChange={() => handleInputChange(index, value)}
                  className="radio-button"
                />
                {value}
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="suggestions-section">
        <label htmlFor="suggestions" className="suggestions-label">
          Additional Suggestions <span className="text-danger">*</span>
        </label>
        <textarea
          id="suggestions"
          required
          value={formData.suggestions}
          onChange={(e) => setFormData({ ...formData, suggestions: e.target.value })}
          className="textarea"
        />
      </div>

      <div className="submit-section">
        <button type="submit" className="submit-button">
          Submit
        </button>
      </div>
    </form>
  );
};

export default FacilitiesFeedback;
