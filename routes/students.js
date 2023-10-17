const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authentication');
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

router.use(authMiddleware);

router.route('/').post(addStudent).get(showStudent);
router.route('/sort').get(showSortStudent);
router.route('/find/:lop').get(findStudentByClass);
router.route('/find/:lop/sort').get(findStudentByClassAndSort);
router.route('/:id').get(findStudent).patch(updateStudent).delete(deleteStudent);

module.exports = router;
