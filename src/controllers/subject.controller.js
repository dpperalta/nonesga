import Subject from '../models/Subject';
import Course from '../models/Course';
import Teacher from '../models/Teacher';
import { sequelize } from '../database/database';
import { returnWrongError, returnError, returnNotFound } from './errors';
import Person from '../models/Person';

//Create a new Subject
export async function createSubject(req, res) {
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
        let newSubject = await Subject.create({
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
        //returnError(res, e, 'Get Subjects');
        return res.status(500).json({ e });
    }
}