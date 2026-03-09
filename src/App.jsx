import { useState, useEffect } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import ConfirmationDialog from './components/ConfirmationDialog';
import * as XLSX from 'xlsx';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({ show: false, studentId: null });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate initial data loading
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    setLoading(true);
    setTimeout(() => {
      const initialStudents = [
        { id: 1, name: 'Jayanth A H', email: 'ahjayanth@gmail.com', age: 20 },
        { id: 2, name: 'Rudra', email: 'rudhra12@gmail.com', age: 22 },
        { id: 3, name: 'Shodan', email: 'shodanraj19@gmail.com', age: 21 },
        { id: 4, name: 'Parvath', email: 'parvathraj1@gmail.com', age: 21 },
      ];
      setStudents(initialStudents);
      setLoading(false);
    }, 1500);
  };

  const handleAddStudent = (studentData) => {
    setLoading(true);
    setTimeout(() => {
      const newStudent = {
        ...studentData,
        id: students.length + 1
      };
      setStudents([...students, newStudent]);
      setShowForm(false);
      setLoading(false);
    }, 500);
  };

  const handleEditStudent = (studentData) => {
    setLoading(true);
    setTimeout(() => {
      const updatedStudents = students.map(student =>
        student.id === studentData.id ? studentData : student
      );
      setStudents(updatedStudents);
      setEditingStudent(null);
      setShowForm(false);
      setLoading(false);
    }, 500);
  };

  const handleDeleteClick = (studentId) => {
    setDeleteDialog({ show: true, studentId });
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      const filteredStudents = students.filter(s => s.id !== deleteDialog.studentId);
      setStudents(filteredStudents);
      setDeleteDialog({ show: false, studentId: null });
      setLoading(false);
    }, 500);
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ show: false, studentId: null });
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleAddClick = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  const handleDownloadExcel = () => {
    const filteredStudents = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const worksheet = XLSX.utils.json_to_sheet(filteredStudents);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    XLSX.writeFile(workbook, 'students_data.xlsx');
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Students Table 

        </h1>
      </header>

      <main className="app-main">
        <div className="actions-bar">
          <button className="btn btn-primary" onClick={handleAddClick}>
            Add New Student
          </button>
          <button className="btn btn-success" onClick={handleDownloadExcel}>
            Download Excel
          </button>
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        )}

        {showForm && (
          <StudentForm
            student={editingStudent}
            onSubmit={editingStudent ? handleEditStudent : handleAddStudent}
            onClose={handleFormClose}
          />
        )}

        <StudentList
          students={filteredStudents}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />

        {deleteDialog.show && (
          <ConfirmationDialog
            message="Are you sure you want to delete this student?"
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />
        )}
      </main>
    </div>
  );
}

export default App;