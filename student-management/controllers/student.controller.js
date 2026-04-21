const studentService = require("../services/student.service");
const ApiError = require("../utils/ApiError");

exports.createStudent = (req, res, next) => {
  try {
    const student = studentService.createStudent(req.body);
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
};

exports.getAllStudents = (req, res, next) => {
  try {
    const { page, limit, search } = req.query;

    const result = studentService.getAllStudents({
      page: Number(page),
      limit: Number(limit),
      search,
    });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getStudentById = (req, res, next) => {
  const student = studentService.getStudentById(req.params.id);

  if (!student) {
    return next(new ApiError(404, "Student not found"));
  }

  res.status(200).json(student);
};

exports.updateStudent = (req, res, next) => {
  const updated = studentService.updateStudent(req.params.id, req.body);

  if (!updated) {
    return next(new ApiError(404, "Student not found"));
  }

  res.status(200).json(updated);
};

exports.deleteStudent = (req, res, next) => {
  const deleted = studentService.deleteStudent(req.params.id);

  if (!deleted) {
    return next(new ApiError(404, "Student not found"));
  }

  res.status(200).json({ message: "Deleted successfully" });
};