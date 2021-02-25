import Course from '../models/Course';
import { sequelize } from '../database/database';
import { returnError, returnNotFound, returnWrongError } from './errors';
import { nonesgaLog } from './log4js';
import { codeGeneration } from '../helpers/codes';

// Create a new Course
export async function createCourse(req, res) {
    const {
        courseName,
        description,
        collegeID
    } = req.body;
    let status = 1;
    let college = req.user.collegeID || null;

    if (collegeID) {
        if (req.role !== 'Super Administrator') {
            college = req.user.collegeID
        } else {
            college = collegeID;
        }
    }

    if (!college) {
        return res.status(400).json({
            ok: false,
            message: 'Plese select a college'
        });
    }

    try {
        let newCourse = await Course.create({
            courseCode: await codeGeneration('course'),
            courseName,
            description,
            collegeID: college
        }, {
            fields: ['courseCode', 'courseName', 'description', 'collegeID'],
            returning: ['courseID', 'courseCode', 'courseName', 'description', 'isActive', 'registeredDate', 'unregisteredDate', 'collegeID']
        });
        if (newCourse) {
            return res.status(200).json({
                ok: true,
                message: 'Course created successfully',
                course: newCourse
            })
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Course');
    }
}

// Get all active courses
export async function getCourses(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const countries = await Course.findAndCountAll({
            attributes: ['courseID', 'courseCode', 'courseName', 'description', 'isActive', 'registeredDate', 'unregisteredDate'],
            order: [
                ['courseName', 'ASC']
            ],
            where: {
                isActive: true
            },
            limit,
            offset: from
        });
        if (countries) {
            return res.status(200).json({
                ok: true,
                countries
            });
        } else {
            returnNotFound(res, 'Any Course');
        }
    } catch (e) {
        console.log('Error:', e);
        return res.status(500).json({ e });
    }
}

// Change to active or inactive to a Course
export async function changeActivationCourse(req, res) {
    const { courseID } = req.params;
    const type = req.query.type;
    let value;
    let action = '';
    let afirmation = '';
    let negation = '';
    let changeActivationJSON;
    if (type.toLowerCase() === 'activate') {
        value = true;
        action = 'Activating';
        afirmation = 'active';
        negation = 'inactive';
        changeActivationJSON = {
            isActive: value,
            unregisteredDate: null
        };
    } else {
        if (type.toLowerCase() === 'inactivate') {
            value = false;
            action = 'Inactivating';
            afirmation = 'inactive';
            negation = 'active';
            changeActivationJSON = {
                isActive: value,
                unregisteredDate: sequelize.literal('CURRENT_TIMESTAMP')
            };
        } else {
            returnWrongError(res, 'type', 'request');
        }
    }
    try {
        const dbCourse = await Course.findOne({
            attributes: ['courseID', 'courseCode', 'courseName', 'isActive', 'registeredDate', 'unregisteredDate'],
            where: {
                courseID
            }
        });
        if (dbCourse) {
            const changeActivation = await Course.update(
                changeActivationJSON, {
                    where: {
                        courseID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Course ' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(404).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Course or Course already ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Course ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Course');
    }
}

// Update a Course
export async function updateCourse(req, res) {
    const { courseID } = req.params;
    const {
        courseCode,
        courseName,
        description
    } = req.body;
    try {
        const dbCourse = await Course.findOne({
            attributes: ['courseID', 'courseName', 'courseCode', 'description'],
            where: {
                courseID
            }
        });
        if (dbCourse === null || dbCourse === undefined) {
            returnNotFound(res, 'Course ID');
        } else {
            const updateCourse = await Course.update({
                courseCode,
                courseName,
                description
            }, {
                where: {
                    courseID
                }
            });
            if (updateCourse) {
                return res.status(200).json({
                    ok: true,
                    message: 'Course updated successfully'
                });
            } else {
                returnNotFound(res, 'Course ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Course');
    }
}

// Get information of a Course by ID
export async function getCourse(req, res) {
    const { courseID } = req.params;
    try {
        const course = await Course.findOne({
            attributes: ['courseID', 'courseCode', 'courseName', 'description', 'isActive', 'registeredDate', 'unregisteredDate'],
            where: {
                courseID,
                collegeID: req.user.collegeID
            }
        });
        if (course) {
            return res.status(200).json({
                ok: true,
                course
            });
        } else {
            returnNotFound(res, 'Course ID');
        }
    } catch (e) {
        console.log('Error:', e);
        return res.status(500).json({ e });
    }
}

// Delete a Course
export async function deleteCourse(req, res) {
    const { courseID } = req.params;
    try {
        const countDeleted = await Course.destroy({
            where: {
                courseID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Course deleted successfully'
            });
        } else {
            returnNotFound(res, 'Course ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Delete Course');
    }
}

// Get courses all of a college
export async function getAllCoursesCollege(req, res) {
    const collegeID = req.user.collegeID;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;

    try {
        const courses = await Course.findAndCountAll({
            attributes: ['courseID', 'courseCode', 'courseName', 'description', 'isActive', 'registeredDate', 'unregisteredDate', 'collegeID'],
            order: [
                ['courseName', 'ASC']
            ],
            where: {
                collegeID
            },
            limit,
            offset: from
        });
        if (courses) {
            return res.status(200).json({
                ok: true,
                courses
            });
        } else {
            returnNotFound(res, 'Any Course');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Get all courses college', 'error');
        returnError(res, e, 'Get all courses college');
    }
}

// Get active or inactive courses all of a college
export async function getAllCoursesCollegeActive(req, res) {

    const collegeID = req.user.collegeID;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    const active = req.query.active || true;

    if (active.toString() !== 'true') {
        if (active.toString() !== 'false') {
            return res.status(400).json({
                ok: false,
                message: 'Active type invalid, please validate'
            });
        }
    }

    try {
        const courses = await Course.findAndCountAll({
            attributes: ['courseID', 'courseCode', 'courseName', 'description', 'isActive', 'registeredDate', 'unregisteredDate', 'collegeID'],
            order: [
                ['courseName', 'ASC']
            ],
            where: {
                isActive: active,
                collegeID
            },
            limit,
            offset: from
        });
        if (courses) {
            return res.status(200).json({
                ok: true,
                courses
            });
        } else {
            returnNotFound(res, 'Any Course');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Get all courses college active', 'error');
        returnError(res, e, 'Get all courses college active');
    }
}