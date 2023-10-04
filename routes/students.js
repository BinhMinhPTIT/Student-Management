const express = require('express');
const {register} = require('../controllers/auth');
const router = express.Router();


const {
    showStudent, 
    addStudent,
    deleteStudent,
    findStudent,
    updateStudent,
    showSortStudent,
    findStudentByClass,
    findStudentByClassAndSort,
} = require('../controllers/Student');

router.route('/').post(addStudent).get(showStudent);
router.route('/sort').get(showSortStudent);
router.route('/find/:lop').get(findStudentByClass);
router.route('/find/:lop/sort').get(findStudentByClassAndSort)
router.route('/:id').get(findStudent).patch(updateStudent).delete(deleteStudent);

module.exports = router;