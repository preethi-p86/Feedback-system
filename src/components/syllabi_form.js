import React, { useState } from 'react';
import { Card, Container, Form, Table, Button, Alert } from 'react-bootstrap';

function SyllabiForm() {
  const [displayform, setDisplay] = useState(true);
  const [recommendations, setRecommendations] = useState('');
  const [error_msg, setErrorMsg] = useState('');
  const [responses, setResponses] = useState({});

  const questions = {
    q1: "The syllabus clearly explains the key technical concepts required.",
    q2: "The syllabus matches well with the stated learning objectives.",
    q3: "There is a good balance between theoretical and practical aspects.",
    q4: "The syllabus covers current, relevant engineering topics effectively.",
    q5: "Projects, internships, or research work enhance the syllabus content.",
    q6: "Evaluation methods are fair, transparent, and easy to understand.",
    q7: "Syllabus encourages critical thinking and real-world problem solving.",
    q8: "Faculty have flexibility to use innovative teaching methods.",
    q9: "Resources and infrastructure support the syllabus delivery well."
  };

  const setNames = [
    "Subject 1", "Subject 2", "Subject 3", "Subject 4",
    "Subject 5", "Lab 1", "Lab 2", "Lab 3"
  ];

  const handleResponseChange = (qKey, setIdx, value) => {
    setResponses(prev => ({
      ...prev,
      [qKey]: {
        ...prev[qKey],
        [setNames[setIdx]]: value
      }
    }));
  };

  const validateForm = () => {
    if (Object.keys(responses).length < Object.keys(questions).length) return false;
    return true;
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      let existingEntries = JSON.parse(localStorage.getItem("syllabusFeedback")) || [];
      const newEntry = {
        id: existingEntries.length,
        responses,
        recommendations
      };
      existingEntries.push(newEntry);
      localStorage.setItem("syllabusFeedback", JSON.stringify(existingEntries));
      setDisplay(false);
    } else {
      setErrorMsg('Please fill all required fields before submitting.');
    }
  };

  return (
    <div style={{
      background: `linear-gradient(to right, #e3f2fd, #ede7f6)`,
      minHeight: '100vh',
      paddingTop: '2rem',
      paddingBottom: '2rem',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0, bottom: 0, right: 0, left: 0,
        backgroundColor: 'rgba(253, 252, 252, 0.25)',
        zIndex: 1
      }} />
      <Container className="py-5">
        {displayform ? (
          <Card className="p-4 shadow-lg" style={{ position: 'relative', zIndex: 2 }}>
            <Card.Title className="mb-4">Syllabus Feedback Form</Card.Title>
            <hr />

            <div style={{ maxHeight: '500px', overflowX: 'auto', overflowY: 'scroll' }}>
              <Table bordered className="sticky-header" style={{ minWidth: '1200px' }}>
                <thead>
                  <tr>
                    <th
                      rowSpan="2"
                      style={{
                        position: 'sticky',
                        left: 0,
                        top: 0,
                        backgroundColor: '#fff',
                        zIndex: 4,
                        verticalAlign: 'middle',
                        minWidth: '250px'
                      }}
                    >
                      Question
                    </th>
                    {setNames.map((setName, idx) => (
                      <th
                        key={idx}
                        colSpan={5}
                        className="text-center"
                        style={{
                          position: 'sticky',
                          top: 0,
                          backgroundColor: '#fff',
                          zIndex: 3,
                          borderRight: '2px solid #000'
                        }}
                      >
                        {setName}
                      </th>
                    ))}
                  </tr>
                  <tr>
                    {setNames.flatMap((_, groupIdx) =>
                      [5, 4, 3, 2, 1].map((score, idx) => {
                        const isLastInGroup = idx === 4;
                        return (
                          <th
                            key={`${groupIdx}-${score}`}
                            className="text-center"
                            style={{
                              position: 'sticky',
                              top: 35,
                              backgroundColor: '#fff',
                              zIndex: 2,
                              borderRight: isLastInGroup ? '2px solid #000' : undefined
                            }}
                          >
                            {score}
                          </th>
                        );
                      })
                    )}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(questions).map(([qKey, question], qIdx) => (
                    <tr key={qKey}>
                      <td style={{
                        position: 'sticky',
                        left: 0,
                        backgroundColor: '#fff',
                        zIndex: 1,
                        minWidth: '250px',
                        whiteSpace: 'normal'
                      }}>
                        {qIdx + 1}. {question}<span className='text-danger'> *</span>
                      </td>
                      {setNames.flatMap((setName, setIdx) =>
                        [5, 4, 3, 2, 1].map((score, idx) => {
                          const isLastInGroup = idx === 4;
                          const fieldId = `${qKey}-${setName}-score${score}`;
                          return (
                            <td
                              key={fieldId}
                              className="text-center"
                              style={{
                                borderRight: isLastInGroup ? '2px solid #000' : undefined
                              }}
                            >
                              <Form.Check
                                type="radio"
                                name={`${qKey}-${setName}`}
                                value={score}
                                checked={responses[qKey]?.[setName] === String(score)}
                                onChange={e => handleResponseChange(qKey, setIdx, e.target.value)}
                                id={fieldId}
                              />
                            </td>
                          );
                        })
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <hr />

            <Form.Group className="mb-4">
              <Form.Label>
                <strong>10. What specific areas of improvement or modifications would you recommend for revising the syllabi?<span className='text-danger'> *</span></strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={recommendations}
                onChange={e => setRecommendations(e.target.value)}
                placeholder="Your suggestions here..."
                required
              />
            </Form.Group>

            {error_msg && (
              <Alert variant="danger" className="mt-3">{error_msg}</Alert>
            )}

            <div style={{ textAlign: 'center' }}>
              <Button variant="primary" onClick={formSubmit}>Submit Feedback</Button>
            </div>
          </Card>
        ) : (
          <Card className="text-center p-5" style={{ position: 'relative', zIndex: 2 }}>
            <h4>Thank you for your feedback!</h4>
            <p>We appreciate your valuable input towards improving our syllabi.</p>
            <Button variant="success" onClick={() => window.location.reload()}>Submit Another Response</Button>
          </Card>
        )}
      </Container>
    </div>
  );
}

export default SyllabiForm;
