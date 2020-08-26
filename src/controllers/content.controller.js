import Content from '../models/Content'
import { sequelize } from '../database/database';
import { returnError, returnNotFound, returnWrongError } from './errors';

// Create new Content


// Create a new Course
/*export async function createCourse(req, res) {
    const {
        courseCode,
        courseName,
        description
    } = req.body;
    let status = 1;
    try {
        let newCourse = await Course.create({
            courseCode,
            courseName,
            description
        }, {
            fields: ['courseCode', 'courseName', 'description'],
            returning: ['courseID', 'courseCode', 'courseName', 'description', 'isActive', 'registeredDate', 'unregisteredDate']
        });
        if (newCourse) {
            return res.status(200).json({
                ok: true,
                message: 'Course created successfully',
                Course: newCourse
            })
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Course');
    }
}*/