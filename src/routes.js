const express = require('express');
const router = express.Router();
const studentRoute = require('./routes/student');
const courseRoute = require('./routes/course');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const authGuard = require('./middleware/authGuard');


router.use('/students', authGuard, studentRoute);
router.use('/courses', authGuard, courseRoute);
router.use('/users', userRoute);
router.use('/auth', authRoute);

module.exports = router;
