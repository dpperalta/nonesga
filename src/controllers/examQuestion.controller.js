import ExamQuestion from '../models/ExamQuestion';
import Exam from '../models/Exam';
import { sequelize } from '../database/database';
import { returnError, returnNotFound } from './errors';

// Create a new Exam Question
export async function createExamQuestion(req, res) {
    const {
        question,
        minGrade,
        maxGrade,
        image,
        examID
    } = req.body;
    try {
        const newExamQuestion = await ExamQuestion.create({
            question,
            minGrade,
            maxGrade,
            image,
            status: 2,
            examID
        }, {
            fields: ['question', 'minGrade', 'maxGrade', 'image', 'status', 'examID'],
            returning: ['questionID', 'question', 'minGrade', 'maxGrade', 'image', 'registeredDate', 'unregisteredDate', 'status', 'isActive', 'examID']
        });
        if (newExamQuestion) {
            return res.status(200).json({
                ok: true,
                message: 'Exam Question created successfully',
                examQuestion: newExamQuestion
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Exam Question');
    }
}

// Get all Exam Questions
export async function getExamQuestions(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const examQuestions = await ExamQuestion.findAndCountAll({
            attributes: ['questionID', 'question', 'minGrade', 'maxGrade', 'image', 'registeredDate', 'status', 'isActive', 'unregisteredDate', 'examID'],
            include: [{
                model: Exam,
                attributes: ['examID', 'topic', 'startDate', 'startHour']
            }],
            limit,
            offset: from
        });
        if (examQuestions.count > 0) {
            return res.status(200).json({
                ok: true,
                examQuestions
            });
        } else {
            returnNotFound(res, 'Any Exam Question');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get all Exam Question');
    }
}

// Get an Exam Question by ID
export async function getExamQuestionByID(req, res) {
    const { questionID } = req.params;
    try {
        const examQuestion = await ExamQuestion.findOne({
            attributes: ['questionID', 'question', 'minGrade', 'maxGrade', 'image', 'registeredDate', 'unregisteredDate', 'status', 'isActive', 'examID'],
            where: {
                questionID
            },
            include: [{
                model: Exam,
                attributes: ['examID', 'topic', 'startDate', 'endDate']
            }]
        });
        if (examQuestion) {
            return res.status(200).json({
                ok: true,
                examQuestion
            });
        } else {
            returnNotFound(res, 'Exam Question ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Exam Question by ID');
    }
}
// Get all exam questions of an exam
export async function getExamQuestionByExam(req, res) {
    const { examID } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const examQuestions = await ExamQuestion.findAndCountAll({
            attributes: ['questionID', 'question', 'minGrade', 'maxGrade', 'image', 'registeredDate', 'unregisteredDate', 'status', 'isActive', 'examID'],
            where: {
                examID
            },
            include: [{
                model: Exam,
                attributes: ['examID', 'topic', 'startDate', 'endDate']
            }],
            limit,
            offset: from
        });
        if (examQuestions) {
            return res.status(200).json({
                ok: true,
                examQuestions
            });
        } else {
            returnNotFound(res, 'Exam ID');
        }
    } catch (e) {
        console.log('Error: ', e);
        returnError(res, e, 'Get Exam Question by Exam');
    }
}

// Get total of min an max grade from an exam by ID
export async function getTotalOfExamByID(req, res) {
    const { examID } = req.params;
    try {
        const totals = await sequelize.query(`
            SELECT	SUM(CASE WHEN "examQuestion"."maxGrade" IS null THEN 0 ELSE "examQuestion"."maxGrade" END) totalMaximo,
                    SUM("examQuestion"."minGrade") totalMinimo
            FROM "examQuestion"
            WHERE "examQuestion"."examID" = ${ examID }
        `);
        const responseTotals = totals[0];
        const totalmaximo = responseTotals[0].totalmaximo;
        const totalminimo = responseTotals[0].totalminimo;
        if (totals) {
            if (totalmaximo === null && totalminimo === null) {
                returnNotFound(res, 'Exam ID');
                return;
            }
            return res.status(200).json({
                ok: true,
                totals: totals[0]
            });
        } else {
            returnNotFound(res, 'Exam ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Totals from Exam Question by Exam ID');
    }
}

// Update an Exam Question
export async function udpateExamQuestion(req, res) {
    const { questionID } = req.params;
    const {
        question,
        minGrade,
        maxGrade,
        image,
        status,
        examID
    } = req.body;
    try {
        const dbExamQuestion = await ExamQuestion.findOne({
            attributes: ['questionID', 'question', 'minGrade', 'maxGrade', 'image', 'registeredDate', 'unregisteredDate', 'status', 'isActive', 'examID'],
            where: {
                questionID
            }
        });
        if (dbExamQuestion === null || dbExamQuestion === undefined) {
            returnNotFound(res, 'Exam Question ID');
        } else {
            const updatedExamQuestion = await ExamQuestion.update({
                question,
                minGrade,
                maxGrade,
                image,
                status,
                examID
            }, {
                where: {
                    questionID
                }
            });
            if (updatedExamQuestion) {
                return res.status(200).json({
                    ok: true,
                    message: 'Exam Question updated successfully'
                });
            } else {
                returnNotFound(res, 'Exam Question ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Exam Question');
    }
}

// Change activation status of an Exam Question
export async function changeActivationExamQuestion(req, res) {
    const { questionID } = req.params;
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
        const dbExamQuestion = await ExamQuestion.findOne({
            attributes: ['questionID', 'registeredDate', 'unregisteredDate', 'isActive', 'examID'],
            where: {
                questionID
            }
        });
        if (dbExamQuestion) {
            const changeActivation = await ExamQuestion.update(
                changeActivationJSON, {
                    where: {
                        questionID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Exam Question' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Exam Question or Exam Question alread ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Exam Question ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Exam Question');
    }
}

// Delete an Exam Question
export async function deleteExamQuestion(req, res) {
    const { questionID } = req.params;
    try {
        const countDeleted = await ExamQuestion.destroy({
            where: {
                questionID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Exam Question deleted successfully'
            });
        } else {
            returnNotFound(res, 'Exam Question ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Delete Exam Question');
    }
}