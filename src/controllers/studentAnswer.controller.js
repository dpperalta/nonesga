import StudentAnswer from '../models/StudentAnswer';
import ExamAnswer from '../models/ExamAnswer';
import Student from '../models/Student';
import { sequelize } from '../database/database';
import { returnError, returnNotFound, returnWrongError } from './errors';
import ExamQuestion from '../models/ExamQuestion';
import Exam from '../models/Exam';
import Person from '../models/Person';

// Create a new Student Answer
export async function createStudentAnswer(req, res) {
    const {
        grade,
        studentAnswer,
        answerID,
        studentID,
        questionID
    } = req.body;

    if (studentID === undefined || studentID === null) {
        return res.status(400).json({
            ok: false,
            message: 'Request error, missing required data - Student'
        });
    }

    if ((answerID === undefined || answerID === null) && (studentAnswer === undefined || studentAnswer === null)) {
        return res.status(400).json({
            ok: false,
            message: 'Request error, missing requiered data - Answer'
        });
    }

    if (answerID !== undefined) {
        if (studentAnswer !== undefined) {
            return res.status(400).json({
                ok: false,
                message: 'There is more than one answer for the question - Student Answer'
            });
        }
    } else {
        if (answerID !== undefined) {
            return res.status(400).json({
                ok: false,
                message: 'There is more than one answer for the question - Exam Answer'
            });
        }
    }

    try {
        const newStudentAnswer = await StudentAnswer.create({
            grade,
            studentAnswer,
            answerID,
            studentID,
            questionID
        }, {
            fields: ['grade', 'studentAnswer', 'answerID', 'studentID', 'questionID'],
            returning: ['studentAnswerID', 'selectedDate', 'grade', 'studentAnswer', 'teacherDetails', 'agentDetails', 'studentDetails', 'isReviewed', 'isActive', 'isPublished', 'publishedDate', 'teacherUpdates', 'studentUpdates', 'agentUpdates', 'answerID', 'studentID', 'questionID']
        });
        if (newStudentAnswer) {
            return res.status(200).json({
                ok: true,
                message: 'Studen Answer created successfully',
                studentAnswer: newStudentAnswer
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Student Answer');
    }
}

// Get all Student Answers
export async function getStudentAnswers(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const studentAnswers = await StudentAnswer.findAndCountAll({
            attributes: ['studentAnswerID', 'selectedDate', 'grade', 'teacherDetails', 'studentDetails', 'agentDetails', 'isReviewed', 'isActive', 'isPublished', 'publishedDate', 'teacherUpdates', 'studentUpdates', 'agentUpdates', 'tryNumber', 'answerID', 'studentID', 'questionID'],
            include: [{
                model: ExamAnswer,
                attributes: ['answerID', 'answer', 'grade', 'isCorrect'],
                include: [{
                    model: ExamQuestion,
                    attributes: ['questionID', 'question'],
                    include: [{
                        model: Exam,
                        attributes: ['examID', 'topic', 'startDate', 'endDate']
                    }]
                }]
            }, {
                model: Student,
                attributes: ['studentID', 'studentCode'],
                include: [{
                    model: Person,
                    attributes: ['personID', 'completeName']
                }]
            }],
            limit,
            offset: from
        });
        if (studentAnswers.count > 0) {
            return res.status(200).json({
                ok: true,
                studentAnswers
            });
        } else {
            returnNotFound(res, 'Any Studen Answer');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get All Student Answers');
    }
}

// Get an Studen Answer by ID
export async function getStudentAnswerByID(req, res) {
    const { studentAnswerID } = req.params;
    try {
        const studentAnswer = await StudentAnswer.findOne({
            attributes: ['studentAnswerID', 'selectedDate', 'grade', 'teacherDetails', 'studentDetails', 'agentDetails', 'isReviewed', 'isActive', 'isPublished', 'publishedDate', 'tryNumber', 'teacherUpdates', 'studentUpdates', 'agentUpdates', 'answerID', 'studentID', 'questionID'],
            where: {
                studentAnswerID
            },
            include: [{
                model: ExamAnswer,
                attributes: ['answerID', 'answer', 'grade', 'isCorrect'],
                include: [{
                    model: ExamQuestion,
                    attributes: ['questionID', 'question'],
                    include: [{
                        model: Exam,
                        attributes: ['examID', 'topic', 'startDate', 'endDate']
                    }]
                }]
            }, {
                model: Student,
                attributes: ['studentID', 'studentCode'],
                include: [{
                    model: Person,
                    attributes: ['personID', 'completeName']
                }]
            }]
        });
        if (studentAnswer) {
            return res.status(200).json({
                ok: true,
                studentAnswer
            });
        } else {
            returnNotFound(res, 'Student Answer ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Student Answer by ID');
    }
}

// Get all answer by a Student
export async function getStudentAnswersByStudent(req, res) {
    const { studentID } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const studentAnswer = await StudentAnswer.findAndCountAll({
            attributes: ['studentAnswerID', 'selectedDate', 'grade', 'teacherDetails', 'studentDetails', 'agentDetails', 'isReviewed', 'isActive', 'isPublished', 'publishedDate', 'tryNumber', 'teacherUpdates', 'studentUpdates', 'agentUpdates', 'answerID', 'studentID', 'questionID'],
            where: {
                studentID
            },
            include: [{
                model: ExamAnswer,
                attributes: ['answerID', 'answer', 'grade', 'isCorrect'],
                include: [{
                    model: ExamQuestion,
                    attributes: ['questionID', 'question'],
                    include: [{
                        model: Exam,
                        attributes: ['examID', 'topic', 'startDate', 'endDate']
                    }]
                }]
            }, {
                model: Student,
                attributes: ['studentID', 'studentCode'],
                include: [{
                    model: Person,
                    attributes: ['personID', 'completeName']
                }]
            }],
            limit,
            offset: from
        });
        if (studentAnswer.count > 0) {
            return res.status(200).json({
                ok: true,
                studentAnswer
            });
        } else {
            returnNotFound(res, 'Student ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Student Answer by Student');
    }
}

// Get all answers by exam
export async function getStudentAnswersByExam(req, res) {
    const { examID } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    const active = req.query.active;
    let activeQuery;
    if (active === undefined || active === null) {
        activeQuery = '';
    } else {
        activeQuery = `AND ex."isActive" = ${ active }`
    }
    try {
        const counter = await sequelize.query(`
            SELECT	COUNT (*)
            FROM "studentAnswer" sa, "examAnswer" ea, "examQuestion" eq, "exam" ex, "student" st, "person" pe
            WHERE 	sa."answerID" = ea."answerID"
                AND	ea."questionID" = eq."questionID"
                AND eq."examID" = ex."examID"
                AND sa."studentID" = st."studentID"
                AND st."personID" = pe."personID"
                AND ex."examID" = ${ examID }
                ${ activeQuery }     
        `);
        let total = counter[1].rows[0].count;
        if (total > 0) {
            const examAnswers = await sequelize.query(`
                SELECT	sa."studentAnswerID" idStudentAnswer,
                        sa."selectedDate" selectionDate,
                        sa."grade" grade,
                        sa."studentAnswer" studentAnswer,
                        sa."teacherDetails" teacherComents,
                        sa."studentDetails" studentComents,
                        sa."agentDetails" agentComents,
                        sa."isReviewed" reviewed,
                        sa."isActive" active,
                        sa."isPublished" published,
                        sa."publishedDate" publishedDate,
                        sa."tryNumber" attempt,
                        sa."teacherUpdates" teacherUpdates,
                        sa."studentUpdates" studentUpdates,
                        sa."agentUpdates", agentUpdates,
                        ea."answerID" idAnswer,
                        ea."answer" noneAnswer,
                        ea."grade" noneGrade,
                        ea."isCorrect" noneCorrect,
                        eq."questionID" idQuestion,
                        eq."question" question,
                        ex."examID" idExam,
                        ex."topic" theme,
                        ex."startDate" dateStart,
                        ex."endDate" dateEnd,
                        st."studentID" idStudent,
                        st."studentCode" code,
                        pe."personID" idPerson,
                        pe."completeName" personNames
                FROM "studentAnswer" sa, "examAnswer" ea, "examQuestion" eq, "exam" ex, "student" st, "person" pe
                WHERE 	sa."answerID" = ea."answerID"
                    AND	ea."questionID" = eq."questionID"
                    AND eq."examID" = ex."examID"
                    AND sa."studentID" = st."studentID"
                    AND st."personID" = pe."personID"
                    AND ex."examID" = ${ examID }
                    ${ activeQuery }
                    ORDER BY pe."lastNames" ASC
                    LIMIT ${ limit }
                    OFFSET ${ from }
            `);
            if (examAnswers) {
                return res.status(200).json({
                    ok: true,
                    examAnswers: examAnswers[0],
                    count: total
                });
            }
        } else {
            returnNotFound(res, 'Exam ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Student Answers by Exam');
    }
}

// Get all answers of an student of an exam
export async function getStudentAnswersByExamAndStudent(req, res) {
    const { examID, studentID } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    const active = req.query.active;
    let activeQuery;
    if (active === undefined || active === null) {
        activeQuery = '';
    } else {
        activeQuery = `AND ex."isActive" = ${ active }`
    }
    try {
        const counter = await sequelize.query(`
            SELECT	COUNT (*)
            FROM "studentAnswer" sa, "examAnswer" ea, "examQuestion" eq, "exam" ex, "student" st, "person" pe
            WHERE 	sa."answerID" = ea."answerID"
                AND	ea."questionID" = eq."questionID"
                AND eq."examID" = ex."examID"
                AND sa."studentID" = st."studentID"
                AND st."personID" = pe."personID"
                AND ex."examID" = ${ examID }
                AND sa."studentID" = ${ studentID }
                ${ activeQuery }     
        `);
        let total = counter[1].rows[0].count;
        if (total > 0) {
            const examAnswers = await sequelize.query(`
                SELECT	sa."studentAnswerID" idStudentAnswer,
                        sa."selectedDate" selectionDate,
                        sa."grade" grade,
                        sa."studentAnswer" studentAnswer,
                        sa."teacherDetails" teacherComents,
                        sa."studentDetails" studentComents,
                        sa."agentDetails" agentComents,
                        sa."isReviewed" reviewed,
                        sa."isActive" active,
                        sa."isPublished" published,
                        sa."publishedDate" publishedDate,
                        sa."tryNumber" attempt,
                        sa."teacherUpdates" teacherUpdates,
                        sa."studentUpdates" studentUpdates,
                        sa."agentUpdates", agentUpdates,
                        ea."answerID" idAnswer,
                        ea."answer" noneAnswer,
                        ea."grade" noneGrade,
                        ea."isCorrect" noneCorrect,
                        eq."questionID" idQuestion,
                        eq."question" question,
                        ex."examID" idExam,
                        ex."topic" theme,
                        ex."startDate" dateStart,
                        ex."endDate" dateEnd,
                        st."studentID" idStudent,
                        st."studentCode" code,
                        pe."personID" idPerson,
                        pe."completeName" personNames
                FROM "studentAnswer" sa, "examAnswer" ea, "examQuestion" eq, "exam" ex, "student" st, "person" pe
                WHERE 	sa."answerID" = ea."answerID"
                    AND	ea."questionID" = eq."questionID"
                    AND eq."examID" = ex."examID"
                    AND sa."studentID" = st."studentID"
                    AND st."personID" = pe."personID"
                    AND ex."examID" = ${ examID }
                    AND sa."studentID" = ${ studentID }
                    ${ activeQuery }
                    ORDER BY pe."lastNames" ASC
                    LIMIT ${ limit }
                    OFFSET ${ from }
            `);
            if (examAnswers) {
                return res.status(200).json({
                    ok: true,
                    examAnswers: examAnswers[0],
                    count: total
                });
            }
        } else {
            returnNotFound(res, 'Exam ID or Student ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Student Answers by Exam and Student');
    }
}

// Update an Student Answer by Teacher
export async function updateStudentAnswerByTeacher(req, res) {
    const { studentAnswerID } = req.params;
    const {
        grade,
        teacherDetails,
        isReviewed
    } = req.body;
    try {
        const dbStudentAnswer = await StudentAnswer.findOne({
            attributes: ['studentAnswerID', 'tryNumber', 'grade', 'teacherDetails', 'isReviewed'],
            where: {
                studentAnswerID
            }
        });
        if (dbStudentAnswer === null || dbStudentAnswer === undefined) {
            returnNotFound(res, 'Student Answer ID');
        } else {
            const updatedStudentAnswer = await StudentAnswer.update({
                grade,
                teacherDetails,
                isReviewed,
                teacherUpdates: sequelize.literal('CURRENT_TIMESTAMP')
            }, {
                where: {
                    studentAnswerID
                }
            });
            if (updatedStudentAnswer) {
                return res.status(200).json({
                    ok: true,
                    message: 'Student Answer updated successfully'
                });
            } else {
                returnNotFound(res, 'Student Answer ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Student Answer');
    }
}

// Update an Studen Answer by Student
export async function updateStudentAnswerByStudent(req, res) {
    const { studentAnswerID } = req.params;
    const {
        studentAnswer,
        studentDetails,
        answerID
    } = req.body;

    if ((answerID === undefined || answerID === null) && (studentAnswer === undefined || studentAnswer === null)) {
        return res.status(400).json({
            ok: false,
            message: 'Request error, missing requiered data - Answer'
        });
    }

    if (answerID !== undefined) {
        if (studentAnswer !== undefined) {
            return res.status(400).json({
                ok: false,
                message: 'There is more than one answer for the question - Student Answer'
            });
        }
    } else {
        if (answerID !== undefined) {
            return res.status(400).json({
                ok: false,
                message: 'There is more than one answer for the question - Exam Answer'
            });
        }
    }

    try {
        const dbStudentAnswer = await StudentAnswer.findOne({
            attributes: ['studentAnswer', 'tryNumber', 'answerID', 'studentAnswer'],
            where: {
                studentAnswerID
            }
        });
        let attempNumber = dbStudentAnswer.dataValues.tryNumber;
        if (dbStudentAnswer === null || dbStudentAnswer === undefined) {
            returnNotFound(res, 'Student Answer ID');
        } else {
            const updatedStudentAnswer = StudentAnswer.update({
                studentAnswer,
                answerID,
                studentDetails,
                tryNumber: attempNumber + 1,
                studentUpdates: sequelize.literal('CURRENT_TIMESTAMP')
            }, {
                where: {
                    studentAnswerID
                }
            });
            if (updatedStudentAnswer) {
                return res.status(200).json({
                    ok: true,
                    message: 'Student Answer updated successfully'
                });
            } else {
                returnNotFound(res, 'Student Answer ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Student Answer by Student');
    }
}

// Publish answers for an exam
export async function publishStudenAnswer(req, res) {
    const {
        studentID,
        examID
    } = req.body;
    try {
        const counter = await sequelize.query(`
            SELECT COUNT (*)
            FROM "studentAnswer" sa, "examQuestion" eq, "exam" ex
                WHERE sa."questionID" = eq."questionID"
                    AND eq."examID" = ex."examID"
                    AND ex."examID" = ${ examID }
                    AND sa."studentID" = ${ studentID }
                    AND sa."isPublished" = false
        `);
        let total = counter[1].rows[0].count;
        if (total > 0) {
            const publishExam = await sequelize.query(`
                UPDATE "studentAnswer"
                    SET "isPublished" = true,
                        "publishedDate" = CURRENT_TIMESTAMP
                    WHERE "questionID" IN (SELECT sa."questionID"
                                            FROM "studentAnswer" sa, "examQuestion" eq, "exam" ex
                                                WHERE sa."questionID" = eq."questionID"
                                                    AND eq."examID" = ex."examID"
                                                    AND ex."examID" = ${ examID }
                                                    AND sa."studentID" = ${ studentID }
                                                    AND sa."isPublished" = false)
                    AND "studentID" = ${ studentID }
                    AND "isPublished" = false;
            `);
            let countUpdated = publishExam[1].rowCount;
            if (countUpdated > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Exam Answers published successfully, total of answers published: ' + countUpdated,
                    totalAnswersPublished: countUpdated
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Any exam answer published or exam already published'
                });
            }
        } else {
            return res.status(400).json({
                ok: false,
                message: 'An error occurred when trying to publish the exam or the exam was already published'
            });
        }
    } catch (e) {
        console.log('Error: ', e);
        returnError(res, e, 'Publishing Exam');
    }

}

// Add Student or Agent Details
export async function updateDetails(req, res) {
    const { studentAnswerID } = req.params;
    const {
        studentDetails,
        agentDetails,
    } = req.body;
    const type = req.query.type;
    if (type.toLowerCase() === 'student' || type.toLowerCase() === 'agent') {
        if (type.toLowerCase() === 'student' && studentDetails === undefined) {
            return res.status(400).json({
                ok: false,
                message: 'Students Details not presents for update'
            });
        }
        if (type.toLowerCase() === 'agent' && agentDetails === undefined) {
            return res.status(400).json({
                ok: false,
                message: 'Agent Details not presents for update'
            });
        }

        try {
            const dbStudentAnswer = await StudentAnswer.findOne({
                attributes: ['studentAnswerID', 'studentDetails', 'agentDetails'],
                where: {
                    studentAnswerID
                }
            });
            console.log('studentAnswer', dbStudentAnswer);
            if (dbStudentAnswer === null | dbStudentAnswer === undefined) {
                returnNotFound(res, 'Student Answer ID');
            } else {
                if (type.toLowerCase() === 'student') {
                    const udpateStudentDetails = await StudentAnswer.update({
                        studentDetails,
                        studentUpdates: sequelize.literal('CURRENT_TIMESTAMP')
                    }, {
                        where: {
                            studentAnswerID
                        }
                    });
                    if (udpateStudentDetails) {
                        return res.status(200).json({
                            ok: true,
                            message: 'Student Details updated successfully'
                        });
                    } else {
                        returnNotFound(res, 'Student Answer ID');
                        return;
                    }
                } else {
                    const updateAgentDetails = await StudentAnswer.update({
                        agentDetails,
                        agentUpdates: sequelize.literal('CURRENT_TIMESTAMP')
                    }, {
                        where: {
                            studentAnswerID
                        }
                    });
                    if (updateAgentDetails) {
                        return res.status(200).json({
                            ok: true,
                            message: 'Agent Details updated successfully'
                        });
                    } else {
                        returnNotFound(res, 'Student Answer ID');
                        return;
                    }
                }
            }
        } catch (e) {
            console.log('Error:', e);
            returnError(res, e, 'Update Agent or Student Details');
        }
    } else {
        returnWrongError(res, 'type', 'Update Details Type');
    }
}

// Delete an Student Aswer
export async function deleteStudentAnswer(req, res) {
    const { studentAnswerID } = req.params;
    try {
        const countDeleted = await StudentAnswer.destroy({
            where: {
                studentAnswerID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Student Answer deleted successfully'
            });
        } else {
            returnNotFound(res, 'Student Answer ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Delete Student Answer');
    }
}