const { 
    getStudent, 
    getAllStudent, 
    updateStudent, 
    addStudent, 
    deleteStudent,
    addCourse,
    deleteCourse
} = require('../controllers/student');
const express = require('express');
const router = express.Router();
router.get('/',getAllStudent);
router.get('/:id',getStudent);
router.post('/',addStudent);
router.put('/:id',updateStudent);
router.delete('/:id',deleteStudent);
router.post('/:id/courses/:code',addCourse);
router.delete('/:id/courses/:code',deleteCourse)

module.exports = router;