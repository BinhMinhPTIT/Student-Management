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
    findStudentByGpa,
    getStudentDataForChart,
    getStudentDataForPieChart,
} = require('../controllers/Student');

router.use(authMiddleware);

router.route('/chart/barchart').get(getStudentDataForChart);
router.route('/chart/piechart').get(getStudentDataForPieChart);
router.route('/').post(addStudent).get(showStudent);
router.route('/sort').get(showSortStudent);
router.route('/find/:lop').get(findStudentByClass);
router.route('/find/:lop/sort').get(findStudentByClassAndSort);
router.route('/find/gpa/:gpa').get(findStudentByGpa);
router.route('/:id').get(findStudent).patch(updateStudent).delete(deleteStudent);

module.exports = router;
