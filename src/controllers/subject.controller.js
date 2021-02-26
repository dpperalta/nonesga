import Subject from '../models/Subject';
import Course from '../models/Course';
import Teacher from '../models/Teacher';
import { sequelize } from '../database/database';
import { returnWrongError, returnError, returnNotFound } from './errors';
import Person from '../models/Person';
import { codeGeneration } from '../helpers/codes';
import { nonesgaLog } from './log4js';

//Create a new Subject
export async function createSubject(req, res) {
    const {
        subjectName,
        description,
        details,
        gradeNeeded,
        gradeHomologation,
        gradeMinimun,
        gradeMaximun,
        teacherID,
        courseID
    } = req.body;
    try {
        let newSubject = await Subject.create({
            subjectCode: await codeGeneration('subject'),
            subjectName,
            description,
            details,
            gradeNeeded,
            gradeHomologation,
            gradeMinimun,
            gradeMaximun,
            teacherID,
            courseID
        }, {
            fields: ['subjectCode', 'subjectName', 'description', 'details', 'gradeNeeded', 'gradeHomologation', 'gradeMinimun', 'gradeMaximun', 'teacherID', 'courseID'],
            returning: ['subjectID', 'subjectCode', 'subjectName', 'description', 'details', 'gradeNeeded', 'gradeHomologation', 'gradeMinimun', 'gradeMaximun', 'isActive', 'registeredDate', 'teacherID', 'courseID']
        });
        if (newSubject) {
            return res.status(200).json({
                ok: true,
                message: 'Subject created successfully',
                subject: newSubject
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Subject');
    }
}

// Get all subjects
export async function getSubjects(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const subjects = await Subject.findAndCountAll({
            attributes: ['subjectID', 'subjectCode', 'subjectName', 'description', 'details', 'isActive', 'registeredDate', 'unregisteredDate', 'gradeNeeded', 'gradeMinimun', 'gradeMaximun', 'teacherID', 'courseID'],
            order: [
                ['subjectName', 'ASC']
            ],
            include: [{
                model: Teacher,
                attributes: ['teacherID', 'personID'],
                include: [{
                    model: Person,
                    attributes: ['personID', 'completeName']
                }]
            }, {
                model: Course,
                attributes: ['courseID', 'courseName']
            }],
            limit,
            offset: from
        });
        if (subjects) {
            return res.status(200).json({
                ok: true,
                subjects
            });
        } else {
            returnNotFound(res, 'Any Subject');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Subjects');
    }
}

// Get information about one subject
export async function getSubject(req, res) {
    const { subjectID } = req.params;
    try {
        const subject = await Subject.findOne({
            attributes: ['subjectID', 'subjectCode', 'subjectName', 'description', 'details', 'isActive', 'registeredDate', 'unregisteredDate', 'gradeNeeded', 'gradeMinimun', 'gradeMaximun', 'teacherID', 'courseID'],
            where: {
                subjectID
            },
            include: [{
                model: Teacher,
                attributes: ['teacherID', 'personID'],
                include: [{
                    model: Person,
                    attributes: ['personID', 'completeName']
                }]
            }, {
                model: Course,
                attributes: ['courseID', 'courseName']
            }]
        });
        if (subject) {
            return res.status(200).json({
                ok: true,
                subject
            });
        } else {
            returnNotFound(res, 'Subject ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Subject');
    }
}

// Update a subject
export async function updateSubject(req, res) {
    const { subjectID } = req.params;
    const {
        subjectCode,
        subjectName,
        description,
        details,
        gradeNeeded,
        gradeHomologation,
        gradeMinimun,
        gradeMaximun,
        teacherID,
        courseID
    } = req.body;
    try {
        const dbSubject = await Subject.findOne({
            attributes: ['subjectID', 'subjectCode', 'subjectName', 'description', 'details', 'isActive', 'registeredDate', 'unregisteredDate', 'gradeNeeded', 'gradeMinimun', 'gradeMaximun', 'teacherID', 'courseID'],
            where: {
                subjectID
            }
        });
        if (dbSubject === null || dbSubject === undefined) {
            returnNotFound(res, 'Subject ID');
        } else {
            const updatedSubject = await Subject.update({
                subjectCode,
                subjectName,
                description,
                details,
                gradeNeeded,
                gradeHomologation,
                gradeMinimun,
                gradeMaximun,
                teacherID,
                courseID
            }, {
                where: {
                    subjectID
                }
            });
            if (updatedSubject) {
                return res.status(200).json({
                    ok: true,
                    message: 'Subject Updatede Successfully'
                });
            } else {
                returnNotFound(res, 'Subject ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Subject');
    }
}

// Change activation status to a subject
export async function changeActivationSubject(req, res) {
    const { subjectID } = req.params;
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
            isActive: true,
            unregisteredDate: null
        };
    } else {
        if (type.toLowerCase() === 'inactivate') {
            value = false;
            action = 'Inactivating';
            afirmation = 'inactive';
            negation = 'active';
            changeActivationJSON = {
                isActive: false,
                unregisteredDate: sequelize.literal('CURRENT_TIMESTAMP')
            };
        } else {
            returnWrongError(res, 'type', 'request');
        }
    }
    try {
        const dbSubject = await Subject.findOne({
            attributes: ['subjectID', 'subjectCode', 'subjectName', 'isActive', 'registeredDate', 'unregisteredDate'],
            where: {
                subjectID
            }
        });
        if (dbSubject) {
            const changeActivation = await Subject.update(
                changeActivationJSON, {
                    where: {
                        subjectID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Subject ' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Subject or Subject already ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Subject ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Subject');
    }
}

export async function deleteSubject(req, res) {
    const { subjectID } = req.params;
    try {
        const countDeleted = await Subject.destroy({
            where: {
                subjectID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Subject deleted successfully'
            });
        } else {
            returnNotFound(res, 'Subject ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Delete Subject');
    }
}

// Get subject by college

// Get subject by course
export async function getCourseSubjects(req, res) {
    const { courseID } = req.params;
    const limit = req.query.limit || 100;
    const from = req.query.from || 0;
    try {
        const subjects = await Subject.findAndCountAll({
            attributes: ['subjectID', 'subjectCode', 'subjectName', 'description', 'details', 'isActive', 'registeredDate', 'unregisteredDate', 'gradeNeeded', 'gradeMinimun', 'gradeMaximun', 'teacherID', 'courseID'],
            where: {
                courseID
            },
            order: [
                ['subjectName', 'ASC']
            ],
            include: [{
                model: Teacher,
                attributes: ['teacherID', 'personID'],
                include: [{
                    model: Person,
                    attributes: ['personID', 'completeName']
                }]
            }],
            limit,
            offset: from
        });
        if (subjects) {
            return res.status(200).json({
                ok: true,
                subjects
            });
        } else {
            returnNotFound(res, 'Any Subject for Course');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Get Subjects by Course', 'error');
        returnError(res, e, 'Get Subjects by Course');
    }
}
// Get subject by teacher
export async function getTeacherSubjects(req, res) {
    const { teacherID } = req.params;
    const limit = req.query.limit || 100;
    const from = req.query.from || 0;
    try {
        const subjects = await Subject.findAndCountAll({
            attributes: ['subjectID', 'subjectCode', 'subjectName', 'description', 'details', 'isActive', 'registeredDate', 'unregisteredDate', 'gradeNeeded', 'gradeMinimun', 'gradeMaximun', 'teacherID', 'courseID'],
            where: {
                teacherID
            },
            order: [
                ['subjectName', 'ASC']
            ],
            include: [{
                model: Course,
                attributes: ['courseID', 'courseName']
            }],
            limit,
            offset: from
        });
        if (subjects) {
            return res.status(200).json({
                ok: true,
                subjects
            });
        } else {
            returnNotFound(res, 'Any Subject for Course');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Get Subjects by Course', 'error');
        returnError(res, e, 'Get Subjects by Course');
    }
}


// Get subject by student