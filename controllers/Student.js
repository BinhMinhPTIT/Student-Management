const Student = require("../models/Student");
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const showStudent = async (req, res) => {
    const students = await Student.find({createdBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ students, numberStudent: students.length });
}

const showSortStudent = async (req, res) => {
    try {
      req.body.createdBy = req.user.userId;
      const list = await Student.find().sort("firstName");
      res.status(StatusCodes.OK).json(list);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
}

const addStudent = async (req, res) => {
    // res.send('add student');
    req.body.createdBy = req.user.userId;
    const student = await Student.create(req.body);
    res.status(StatusCodes.CREATED).json({ student });
}

const deleteStudent = async (req, res) => {
    // res.send('delete student');
    const {
        params: { id: studentId },
        user: { userId },
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
        user: { userId },
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
        user: { userId },
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
    user: { userId },
  } = req
const students = await Student.find({
    lop: studentClass,
})

if (!students) {
    throw new NotFoundError(`No student with class ${studentClass}`);
}
res.status(StatusCodes.OK).json({ students });
}

const findStudentByClassAndSort = async (req, res) => {
  try {
    const {
      params: {lop},
      user: { userId },
    } = req
    const list = await Student.find(req.params).sort("firstName");
    res.status(StatusCodes.OK).json(list);
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