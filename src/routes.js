const express = require('express');
const router = express.Router();
const studentRoute = require('./routes/student');
const courseRoute = require('./routes/course');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const authGuard = require('./middleware/authGuard');
const responseFormatter = require('./utils/responseFormatter');

router.get('/', (req, res) =>
  responseFormatter(
    res,
    200,
    'Welcome to the iStudy api! Visit https://github.com/yaoliu928/iStudy.git to see the code',
    null
  )
);

router.use('/students', authGuard, studentRoute);
router.use('/courses', authGuard, courseRoute);
router.use('/users', userRoute);
router.use('/auth', authRoute);

module.exports = router;
