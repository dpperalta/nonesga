import ExamAnswer from '../models/ExamAnswer';
import ExamQuestion from '../models/ExamQuestion';
import Exam from '../models/Exam';
import { sequelize } from '../database/database';
import { returnError, returnNotFound, returnWrongError } from './errors';

// Create a new Exam Answer
export async function createExamAnswer(req, res) {
    const {
        answer,
        grade,
        homologatedGrade,
        isCorrect,
        detail,
        questionID
    } = req.body;
    try {
        const newExamAnswer = await ExamAnswer.create({
            answer,
            grade,
            homologatedGrade,
            isCorrect,
            status: 2, // Status 2 is draft, when the teacher finishes creation update to status 1
            detail,
            questionID
        }, {
            fields: ['answer', 'grade', 'homologatedGrade', 'isCorrect', 'status', 'detail', 'questionID'],
            returning: ['answerID', 'answer', 'grade', 'homologatedGrade', 'isCorrect', 'registeredDate', 'unregisteredDate', 'isActive', 'status', 'detail', 'questionID']
        });
        if (newExamAnswer) {
            return res.status(200).json({
                ok: true,
                message: 'Exam Answer created successfully',
                examAnswer: newExamAnswer
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Exam Answer')
    }
}

// Get all Exam Answers
export async function getExamAnswers(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const examAnswers = await ExamAnswer.findAndCountAll({
            attributes: ['answerID', 'answer', 'grade', 'homologatedGrade', 'isCorrect', 'registeredDate', 'unregisteredDate', 'isActive', 'status', 'detail', 'questionID'],
            include: [{
                model: ExamQuestion,
                attributes: ['questionID', 'question', 'minGrade', 'maxGrade'],
                include: [{
                    model: Exam,
                    attributes: ['examID', 'topic', 'startDate', 'endDate']
                }]
            }],
            limit,
            offset: from
        });
        if (examAnswers.count > 0) {
            return res.status(200).json({
                ok: true,
                examAnswers
            });
        } else {
            returnNotFound(res, 'Any Exam Answer');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get all Exam Answers');
    }
}

// Get an Exam Asnwer by ID
export async function getExamAnswerByID(req, res) {
    const { answerID } = req.params;
    try {
        const examAnswer = await ExamAnswer.findOne({
            attributes: ['answerID', 'answer', 'grade', 'homologatedGrade', 'isCorrect', 'registeredDate', 'unregisteredDate', 'isActive', 'status', 'detail', 'questionID'],
            where: {
                answerID
            },
            include: [{
                model: ExamQuestion,
                attributes: ['questionID', 'question', 'minGrade', 'maxGrade'],
                include: [{
                    model: Exam,
                    attributes: ['examID', 'topic', 'startDate', 'endDate']
                }]
            }]
        });
        if (examAnswer) {
            return res.status(200).json({
                ok: true,
                examAnswer
            });
        } else {
            returnNotFound(res, 'Exam Answer ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Exam Answer by ID');
    }
}

// Get all answers for an question
export async function getExamAnswerByQuestion(req, res) {
    const { questionID } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const examAnswers = await ExamAnswer.findAndCountAll({
            attributes: ['answerID', 'answer', 'grade', 'homologatedGrade', 'isCorrect', 'registeredDate', 'unregisteredDate', 'isActive', 'status', 'detail', 'questionID'],
            where: {
                questionID
            },
            include: [{
                model: ExamQuestion,
                attributes: ['questionID', 'question', 'minGrade', 'maxGrade'],
                include: [{
                    model: Exam,
                    attributes: ['examID', 'topic', 'startDate', 'endDate']
                }]
            }],
            limit,
            offset: from
        });
        if (examAnswers) {
            return res.status(200).json({
                ok: true,
                examAnswers
            });
        } else {
            returnNotFound(res, 'Exam Question ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Exam Answers by Question');
    }
}

// Get all answers for an exam
export async function getExamAnswerByExam(req, res) {
    const { examID } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    const correct = req.query.correct;
    let correctQuery;
    if (correct === undefined || correct === null) {
        correctQuery = '';
    } else {
        correctQuery = `AND ea."isCorrect" = ${ correct }`;
    }
    try {
        const counter = await sequelize.query(`
            SELECT COUNT (*)
            FROM "examAnswer" ea, "examQuestion" eq, "exam" ex
            WHERE 	ea."questionID" = eq."questionID"
                AND	eq."examID" = ex."examID"
                AND ex."examID" = ${ examID }
                ${ correctQuery }
        `);
        let total = counter[1].rows[0].count;
        if (total > 0) {
            const examAnswers = await sequelize.query(`
                SELECT 	ea."answerID" idAnswer,
                        ea."answer" answer,
                        ea."grade" grade,
                        ea."homologatedGrade" homologated,
                        ea."isCorrect" correct,
                        ea."registeredDate" registerm,
                        ea."unregisteredDate" unregister,
                        ea."status" status,
                        ea."detail" details,
                        eq."question" question,
                        eq."minGrade" minimunGrade,
                        eq."maxGrade" maximunGrade,
                        ex."topic" theme,
                        ex."startDate" dateOfStart,
                        ex."endDate" dateOfEnd
                FROM "examAnswer" ea, "examQuestion" eq, "exam" ex
                WHERE 	ea."questionID" = eq."questionID"
                    AND	eq."examID" = ex."examID"
                    AND ex."examID" = ${ examID }
                    ${ correctQuery }
                    ORDER BY eq."questionID"
                    LIMIT ${ limit }
                    OFFSET ${ from }
            `);
            if (examAnswers) {
                return res.status(200).json({
                    ok: true,
                    answers: examAnswers[0],
                    count: total
                });
            } else {
                returnNotFound(res, 'Exam ID');
                return;
            }
        } else {
            returnNotFound(res, 'Exam ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Exam Answers by Question');
    }
}

// Update an Exam Answer
export async function updateAnswer(req, res) {
    const { answerID } = req.params;
    const {
        answer,
        grade,
        homologatedGrade,
        status,
        isCorrect,
        detail,
        questionID
    } = req.body;
    try {
        const dbExamAnswer = await ExamAnswer.findOne({
            attributes: ['answerID', 'answer', 'grade', 'homologatedGrade', 'status', 'isCorrect', 'detail'],
            where: {
                answerID
            }
        });
        if (dbExamAnswer === null || dbExamAnswer === undefined) {
            returnNotFound(res, 'Exam Answer ID');
        } else {
            const updatedExamAnswer = await ExamAnswer.update({
                answer,
                grade,
                homologatedGrade,
                status,
                isCorrect,
                detail,
                questionID
            }, {
                where: {
                    answerID
                }
            });
            if (updatedExamAnswer) {
                return res.status(200).json({
                    ok: true,
                    message: 'Exam Answer updated successfully'
                });
            } else {
                returnNotFound(res, 'Exam Answer ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Exam Answer');
    }
}

// Change activation status of an Exam Answer
export async function changeActivationExamAnswer(req, res) {
    const { answerID } = req.params;
    const type = req.query.type;
    let value;
    let action = '';
    let afirmation = '';
    let negation = '';
    let changeActivationJSON;
    if (type.toLowerCase() === 'activate') {
        value = true,
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
            }
        } else {
            returnWrongError(res, 'type', 'request');
        }
    }
    try {
        const dbExamAnswer = await ExamAnswer.findOne({
            attributes: ['answerID', 'registeredDate', 'unregisteredDate', 'isActive'],
            where: {
                answerID
            }
        });
        if (dbExamAnswer) {
            const changeActivation = await ExamAnswer.update(
                changeActivationJSON, {
                    where: {
                        answerID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Exam Answer ' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Exam Answer or Exam Answer alread ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Exam Answer ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Exam Answer');
    }
}

// Delete an Exam Answer
export async function deleteExamAnswer(req, res) {
    const { answerID } = req.params;
    try {
        const countDeleted = await ExamAnswer.destroy({
            where: {
                answerID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Exam Answer deleted successfully'
            });
        } else {
            returnNotFound(res, 'Exam Answer ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Delete Exam Answer');
    }
}