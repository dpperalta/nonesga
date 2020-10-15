import ExamGrade from '../models/ExamGrade';
import Student from '../models/Student';
import Exam from '../models/Exam';
//import StudentAnswer from '../models/StudentAnswer';
//import ExamAnswer from '../models/ExamAnswer';
//import ExamQuestion from '../models/ExamQuestion';
import { sequelize } from '../database/database';
import { returnError, returnNotFound } from './errors';
import Person from '../models/Person';
import Teacher from '../models/Teacher';

// Create new Exam Grade
export async function createExamGrade(req, res) {
    const {
        gradeDetail,
        studentID,
        examID,
        teacherID
    } = req.body;
    try {
        const sumOfGrades = await sequelize.query(`
            SELECT  SUM(CASE WHEN sa."grade" IS null THEN 0 ELSE sa."grade" end) grade
            FROM    "studentAnswer" sa, "examAnswer" ea, "examQuestion" eq, "exam" ex
                WHERE   sa."answerID" = ea."answerID"
                    AND ea."questionID" = eq."questionID"
                    AND eq."examID" = ex."examID"
                    AND ex."examID" = ${ examID }
                    AND sa."studentID" = ${ studentID }
                    AND sa."isPublished" = true
                    AND sa."isActive" = true
                    AND eq."isActive" = true
                    AND ex."isActive" = true;
        `);

        const responseGrades = sumOfGrades[0];
        const totalGrade = responseGrades[0].grade

        if (totalGrade === undefined || totalGrade === null) {
            return res.status(400).json({
                ok: false,
                message: 'There is no exam to grade for the Student'
            });
        }

        if (totalGrade === undefined || totalGrade === null) {
            returnNotFound(res, 'Exam or Student ID');
        } else {
            const newExamGrade = await ExamGrade.create({
                grade: totalGrade,
                homologatedGrade: taskScoreHomologation(totalGrade),
                gradeDate: sequelize.literal('CURRENT_TIMESTAMP'),
                gradeDetail,
                isGraded: true,
                studentID,
                examID,
                teacherID
            }, {
                fields: ['grade', 'homologatedGrade', 'gradeDate', 'gradeDetail', 'isGraded', 'studentID', 'examID', 'teacherID'],
                returning: ['examGradeID', 'grade', 'homologatedGrade', 'gradeDate', 'gradeDetail', 'isGraded', 'isModified', 'modificationDate', 'modificationUser', 'previousGrade', 'studentID', 'examID', 'teacherID']
            });
            if (newExamGrade) {
                return res.status(200).json({
                    ok: true,
                    message: 'Exam Graded successfully',
                    examGrade: newExamGrade
                });
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Exam Grade');
    }
}

// Get all Exam Grades
export async function getExamGrades(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const examGrades = await ExamGrade.findAndCountAll({
            attributes: ['examGradeID', 'grade', 'gradeDate', 'homologatedGrade', 'gradeDetail', 'isGraded', 'isModified', 'modificationDate', 'modificationUser', 'previousGrade', 'studentID', 'examID', 'teacherID'],
            include: [{
                model: Exam,
                attributes: ['examID', 'topic', 'startDate', 'endDate']
            }, {
                model: Student,
                attributes: ['studentID', 'studentCode'],
                include: {
                    model: Person,
                    attributes: ['personID', 'completeName']
                }
            }, {
                model: Teacher,
                attributes: ['teacherID', 'teacherCode'],
                include: {
                    model: Person,
                    attributes: ['personID', 'completeName']
                }
            }]
        });
        if (examGrades.count > 0) {
            return res.status(200).json({
                ok: true,
                examGrades
            });
        } else {
            returnNotFound(res, 'Any Exam Grades');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get all Exam Grades');
    }
}

// Get an Exam Grade by ID
export async function getExamGradeByID(req, res) {
    const { examGradeID } = req.params;
    try {
        const examGrade = await ExamGrade.findOne({
            attributes: ['examGradeID', 'grade', 'gradeDate', 'homologatedGrade', 'gradeDetail', 'isGraded', 'isModified', 'modificationDate', 'modificationUser', 'previousGrade', 'studentID', 'examID', 'teacherID'],
            where: {
                examGradeID
            },
            include: [{
                model: Exam,
                attributes: ['examID', 'topic', 'startDate', 'endDate']
            }, {
                model: Student,
                attributes: ['studentID', 'studentCode'],
                include: {
                    model: Person,
                    attributes: ['personID', 'completeName']
                }
            }, {
                model: Teacher,
                attributes: ['teacherID', 'teacherCode'],
                include: {
                    model: Person,
                    attributes: ['personID', 'completeName']
                }
            }]
        });
        if (examGrade) {
            return res.status(200).json({
                ok: true,
                examGrade
            })
        } else {
            returnNotFound(res, 'Exam Grade ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Exam Grade by ID');
    }
}

function taskScoreHomologation(score) {
    if (score > 9 && score <= 10) {
        return 'A+';
    }
    if (score > 8 && score <= 9) {
        return 'A-';
    }
    if (score > 7 && score <= 8) {
        return 'B+';
    }
    if (score > 6 && score <= 7) {
        return 'B-';
    }
    if (score > 5 && score <= 6) {
        return 'C+';
    }
    if (score > 4 && score <= 5) {
        return 'C-';
    }
    if (score > 3 && score <= 4) {
        return 'D+';
    }
    if (score > 2 && score <= 3) {
        return 'D-';
    }
    if (score > 1 && score <= 2) {
        return 'E+';
    }
    if (score > 0 && score <= 1) {
        return 'E-';
    }
    if (score === 0) {
        return 'F';
    }
    if (score < 0 || score > 10) {
        return 'Error';
    }
}