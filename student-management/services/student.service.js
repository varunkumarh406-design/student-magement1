const Student = require("../models/student.model");
const fs = require("fs");
const path = require("path");

let students = [];

// Load from file (optional)
const filePath = path.join(__dirname, "../data/students.json");

const loadStudents = () => {
  if (fs.existsSync(filePath)) {
    students = JSON.parse(fs.readFileSync(filePath));
  }
};

const saveStudents = () => {
  fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
};

loadStudents();

exports.createStudent = (data) => {
  const newStudent = new Student({
    id: Date.now().toString(),
    ...data,
  });

  students.push(newStudent);
  saveStudents();

  return newStudent;
};

exports.getAllStudents = ({ page = 1, limit = 5, search = "" }) => {
  let filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + Number(limit));

  return {
    total: filtered.length,
    page,
    data: paginated,
  };
};

exports.getStudentById = (id) => {
  return students.find(s => s.id === id);
};

exports.updateStudent = (id, data) => {
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return null;

  students[index] = { ...students[index], ...data };
  saveStudents();

  return students[index];
};

exports.deleteStudent = (id) => {
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return false;

  students.splice(index, 1);
  saveStudents();

  return true;
};