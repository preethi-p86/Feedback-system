import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/only-logo.webp';
import './TeacherSelection.css'; // Import your CSS file

const teachers = [
  "Dr. Sharmila", "Dr. Kalai", "Mrs. Alagu P",
  "Dr. Preethi PA", "Dr. Abinaya P",
  "Mr. Rakesh", "Ms. Ananthi", "Mr. Kailash"
];

const departments = [
  "B.E. ECE", "B.E. EEE", "B.E. Mechanical", "B.E. Chemical", "B.E. Civil",
  "B.Tech IT", "B.E. CSE", "B.E. AI & DS", "M.Sc. Software Systems", "M.Sc. Data Science",
  "M.Sc. Decision and Computing Science", "M.Sc. AIML"
];

const subjectSets = {
  'M.Sc. Data Science': {
    odd: [
      { code: "16MDS41", name: "NLP" },
      { code: "16MDS42", name: "SHP" },
      { code: "16MDS43", name: "LLM" },
      { code: "16MDS44", name: "Statistics" },
      { code: "16MDS45", name: "Subject" },
      { code: "16MDS11", name: "NLP Lab" },
      { code: "16MDS13", name: "SHP Lab" },
      { code: "16MDS19", name: "LLM Laboratory" }
    ],
    even: [
      { code: "17MDS41", name: "NLP" },
      { code: "17MDS42", name: "SHP" },
      { code: "17MDS43", name: "LLM" },
      { code: "17MDS44", name: "Statistics" },
      { code: "17MDS45", name: "Subject" },
      { code: "17MDS11", name: "NLP Lab" },
      { code: "17MDS13", name: "SHP Lab" },
      { code: "17MDS19", name: "LLM Laboratory" }
    ]
  },
  'B.E. ECE': {
    odd: [
      { code: "16ECE41", name: "Subject 1" },
      { code: "16ECE42", name: "Subject 2" },
      { code: "16ECE43", name: "Subject 3" },
      { code: "16ECE44", name: "Subject 4" },
      { code: "16ECE45", name: "Subject 5" },
      { code: "16ECE11", name: "Lab 1" },
      { code: "16ECE13", name: "Lab 2" },
      { code: "16ECE19", name: "Lab 3" }
    ],
    even: [
      { code: "17ECE41", name: "Subject 1" },
      { code: "17ECE42", name: "Subject 2" },
      { code: "17ECE43", name: "Subject 3" },
      { code: "17ECE44", name: "Subject 4" },
      { code: "17ECE45", name: "Subject 5" },
      { code: "17ECE11", name: "Lab 1" },
      { code: "17ECE13", name: "Lab 2" },
      { code: "17ECE19", name: "Lab 3" }
    ]
  }
};

const TeacherSelection = () => {
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selections, setSelections] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (code, value) => {
    setSelections(prev => ({ ...prev, [code]: value }));
  };

  const handleDepartmentChange = (value) => {
    setDepartment(value);
    setSemester('');
    setSubjects([]);
    setSelections({});
    setError('');
  };

  const generateSemesterOptions = () => {
    const count = department.startsWith("B.E") || department.startsWith("B.Tech") ? 8 : 10;
    return Array.from({ length: count }, (_, i) => `${i + 1}${['st','nd','rd'][i] || 'th'} Semester`);
  };

  const determineSemesterType = (sem) => {
    const number = parseInt(sem);
    return isNaN(number) ? 'odd' : (number % 2 === 0 ? 'even' : 'odd');
  };

  useEffect(() => {
    if (department && semester) {
      const semType = determineSemesterType(semester);
      let deptSubjects = subjectSets[department]?.[semType];

      if (!deptSubjects) {
        if (department.startsWith('B.E.')) {
          deptSubjects = subjectSets['B.E. ECE']?.[semType] || [];
        } else if (department.startsWith('M.Sc.')) {
          deptSubjects = subjectSets['M.Sc. Data Science']?.[semType] || [];
        } else {
          deptSubjects = [];
        }
      }

      setSubjects(deptSubjects);
      setSelections({});
      setError('');
    } else {
      setSubjects([]);
      setSelections({});
      setError('');
    }
  }, [department, semester]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !department || !semester ||
      subjects.length === 0 ||
      Object.keys(selections).length !== subjects.length ||
      !Object.values(selections).every(val => val)
    ) {
      setError("Please fill in all the fields before proceeding.");
      return;
    }

    localStorage.setItem('teacherSelections', JSON.stringify({ department, semester, subjects: selections }));
    navigate('/syllabi-feedback');
  };

  return (
    <div className="teacher-selection-page">
      <Container>
        <Card className="teacher-selection-card">
          <div className="logo-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img src={bgImage} alt="Logo" className="logo" style={{ width: '120px', opacity: 0.8 }} />
          </div>

          <Card.Title className="card-title">
            Choose your teacher for your respective subjects
          </Card.Title>

          <Form onSubmit={handleSubmit}>
            <Card className="info-section">
              <Card.Title>Student Information</Card.Title>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}><strong>Department<span className='text-danger'> *</span></strong></Form.Label>
                <Col sm={8}>
                  <Form.Select value={department} onChange={(e) => handleDepartmentChange(e.target.value)} required>
                    <option value="">-- Select Department --</option>
                    {departments.map((dept, i) => (
                      <option key={i} value={dept}>{dept}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              {department && (
                <Form.Group as={Row} className="mb-0">
                  <Form.Label column sm={4}><strong>Semester<span className='text-danger'> *</span></strong></Form.Label>
                  <Col sm={8}>
                    <Form.Select value={semester} onChange={(e) => setSemester(e.target.value)} required>
                      <option value="">-- Select Semester --</option>
                      {generateSemesterOptions().map((sem, i) => (
                        <option key={i} value={sem}>{sem}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              )}
            </Card>

            {/* Dynamic Subjects */}
            {subjects.map(({ code, name }) => (
              <Form.Group as={Row} className="mb-3" key={code}>
                <Form.Label column sm={4}>
                  {code} - {name} <span className='text-danger'>*</span>
                </Form.Label>
                <Col sm={8}>
                  <Form.Select value={selections[code] || ''} onChange={e => handleChange(code, e.target.value)} required>
                    <option value="">-- Select Teacher --</option>
                    {teachers.map((teacher, i) => (
                      <option key={i} value={teacher}>{teacher}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
            ))}

            <hr />

            {error && <Alert variant="danger">{error}</Alert>}

            <div style={{ textAlign: 'center' }}>
              <Button type="submit" className="proceed-button">
                Proceed to Feedback
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default TeacherSelection;
