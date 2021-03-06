const Student = require('../models/student');
const Course = require('../models/course');

async function addStudent(req, res) {
    const { firstName, lastName, email } = req.body;
    const student = new Student({
        firstName,
        lastName,
        email
    });
    await student.save();
    return res.json(student);
}
async function getStudent(req, res) {
    const { id } = req.params;
    const student = await Student.findById(id)
        .populate('courses', 'code name').exec();
    if (!student) {
        return res.status(404).json('student not found');
    }
    return res.json(student);
};
async function getAllStudent(req, res) {
    const students = await Student.find().exec();
    return res.json(students);
};
async function updateStudent(req, res) {
    const { id } = req.params;
    const { firstName,
        lastName,
        email } = req.body;
    const newStudent = await Student.findByIdAndUpdate(
        id,
        { firstName, lastName, email },
        { new: true }
    ).exec();
    if (!newStudent) {
        return res.status(404).json('student not found');
    }
    return res.json(newStudent);
};
async function deleteStudent(req, res) {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id).exec();
    if (!student) {
        return res.status(404).json('student not found');
    }
    await Course.updateMany(
        {
            _id: { $in: student.courses }
        },
        {
            $pull: {
                students: student._id
            }
        }
    )
    return res.sendStatus(200);
};

async function addCourse(req, res) {
    const { id, code } = req.params;
    const student = await Student.findById(id).exec();
    const course = await Course.findById(code).exec();

    if (!student || !course) {
        return res.status(404).json('student or course not found');
    }
    student.courses.addToSet(course._id);
    course.students.addToSet(student._id);
    await course.save();
    await student.save();
    return res.json(student);
}

async function deleteCourse(req, res) {
    const { id, code } = req.params;
    const student = await Student.findById(id).exec();
    const course = await Course.findById(code).exec();

    if (!student || !course) {
        return res.status(404).json('student or course not found');
    }
    const oldCount = student.courses.length;
    student.courses.pull(course._id);
    if (student.courses.length === oldCount) {
        return res.status(404).json('enrolment does not exist');
    }
    course.students.pull(student._id);
    await course.save();
    await student.save();
    return res.json(student);
}

module.exports = {
    addStudent,
    getStudent,
    getAllStudent,
    updateStudent,
    deleteStudent,
    addCourse,
    deleteCourse
};