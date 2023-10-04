const Student = require("../models/Student");
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const showStudent = async (req, res) => {
    const student = await Student.find({});
    res.status(StatusCodes.OK).json({ student, numberStudent: student.length });
}

const showSortStudent = async (req, res) => {
    try {
      const students = await Student.find();
      const sortedStudent = students.sort((a, b) => {
        const firstNameA = a.firstName.toUpperCase();
        const firstNameB = b.firstName.toUpperCase();
        if (firstNameA < firstNameB){
          return -1;
        }
        if (firstNameA > firstNameB){
          return 1;
        }
        return 0;
      });
      res.status(StatusCodes.OK).json(sortedStudent);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
}

const addStudent = async (req, res) => {
    // res.send('add student');
    const student = await Student.create(req.body);
    res.status(StatusCodes.CREATED).json({ student });
}

const deleteStudent = async (req, res) => {
    // res.send('delete student');
    const {
        params: { id: studentId },
      } = req
    
      const student = await Student.findByIdAndRemove({
        _id: studentId,
      })
      if (!student) {
        throw new NotFoundError(`No student with id ${studentId}`)
      }
      res.status(StatusCodes.OK).send('Student deleted successfully');
}

const findStudent = async (req, res) => {
    // res.send('find student');
    const {
        params: { id: studentId },
      } = req
    const student = await Student.findOne({
        _id: studentId,
    })
    if (!student) {
        throw new NotFoundError(`No student with id ${studentId}`);
    }
    res.status(StatusCodes.OK).json({ student });
}

const updateStudent = async (req, res) => {
    // res.send('update student');
    const {
        body: { ten, role, lop },
        params: { id: studentId },
      } = req
    
      if (ten === '' || role === ''|| lop === '') {
        throw new BadRequestError('Name, Role or Class fields cannot be empty')
      }
      const student = await Student.findByIdAndUpdate(
        { _id: studentId},
        req.body,
        { new: true, runValidators: true }
      )
      if (!student) {
        throw new NotFoundError(`No student with id ${studentId}`)
      }
      res.status(StatusCodes.OK).json({ student })
}

const findStudentByClass = async (req, res) => {
  // res.send('update student');  
  const {
    params: { lop: studentClass },
  } = req
const student = await Student.find({
    lop: studentClass,
})

if (!student) {
    throw new NotFoundError(`No student with class ${studentClass}`);
}
res.status(StatusCodes.OK).json({ student });
}

const findStudentByClassAndSort = async (req, res) => {
  try {
    const {
      params: { lop: studentClass },
    } = req
  const students = await Student.find({
      lop: studentClass,
  })
  const sortedStudent = students.sort((a, b) => {
    const firstNameA = a.firstName.toUpperCase();
    const firstNameB = b.firstName.toUpperCase();
    if (firstNameA < firstNameB){
      return -1;
    }
    if (firstNameA > firstNameB){
      return 1;
    }
    return 0;
  });
    res.status(StatusCodes.OK).json(sortedStudent);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
}

module.exports = {
    showStudent,
    addStudent,
    deleteStudent,
    findStudent,
    updateStudent,
    showSortStudent,
    findStudentByClass,
    findStudentByClassAndSort,
}