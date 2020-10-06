import TaskEvaluation from '../models/TaskEvaluation';
import Task from '../models/Task';
import Student from '../models/Student';
import Person from '../models/Person';
import { returnError, returnNotFound, returnWrongError } from './errors';
import { sequelize } from '../database/database';

// Create a new Task Evaluation
export async function createTaskEvaluation(req, res) {
    const {
        taskScore,
        taskEvaluationDate,
        taskID,
        studentID
    } = req.body;
    const homologation = taskScoreHomologation(taskScore);
    if (homologation === 'Error') {
        return res.status(400).json({
            ok: false,
            message: 'Homologation values error, please validate'
        });
    }
    try {
        const newTaskEvaluation = await TaskEvaluation.create({
            taskScore,
            scoreHomologation: homologation,
            taskEvaluationDate,
            taskID,
            studentID
        }, {
            fields: ['taskScore', 'scoreHomologation', 'taskEvaluationDate', 'taskID', 'studentID'],
            returning: ['taskEvaluationID', 'taskScore', 'scoreHomologation', 'registeredDate', 'unregisteredDate', 'taskEvaluationDate', 'studentDetail', 'isActive', 'agentDetail', 'taskID', 'studentID']
        });
        if (newTaskEvaluation) {
            return res.status(200).json({
                ok: true,
                message: 'Task Evaluation created successfully',
                taskEvaluation: newTaskEvaluation
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Task Evaluation');
    }
}

// Get all task evaluations
export async function getTaskEvaluations(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    const active = req.query.active || true;
    try {
        const taskEvaluations = await TaskEvaluation.findAndCountAll({
            attributes: ['taskEvaluationID', 'taskScore', 'scoreHomologation', 'registeredDate', 'unregisteredDate', 'taskEvaluationDate', 'studentDetail', 'isActive', 'agentDetail', 'taskID', 'studentID'],
            where: {
                isActive: active
            },
            include: [{
                model: Task,
                attributes: ['taskID', 'taskCode', 'taskName', 'taskDetail']
            }, {
                model: Student,
                attributes: ['studentID', 'studentCode'],
                include: [{
                    model: Person,
                    attributes: ['personID', 'dni', 'completeName']
                }]
            }]
        });
        if (taskEvaluations.count > 0) {
            return res.status(200).json({
                ok: true,
                taskEvaluations
            });
        } else {
            returnNotFound(res, 'Any Task Evaluation');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get all Task Evaluations');
    }
}

// Get a Task Evaluation by ID
export async function getTaskEvaluationByID(req, res) {
    const { taskEvaluationID } = req.params;
    try {
        const taskEvaluation = await TaskEvaluation.findOne({
            attributes: ['taskEvaluationID', 'taskScore', 'scoreHomologation', 'registeredDate', 'unregisteredDate', 'taskEvaluationDate', 'studentDetail', 'isActive', 'agentDetail', 'taskID', 'studentID'],
            where: {
                taskEvaluationID
            },
            include: [{
                model: Task,
                attributes: ['taskID', 'taskCode', 'taskName', 'taskDetail']
            }, {
                model: Student,
                attributes: ['studentID', 'studentCode'],
                include: [{
                    model: Person,
                    attributes: ['personID', 'dni', 'completeName']
                }]
            }]
        });
        if (taskEvaluation) {
            return res.status(200).json({
                ok: true,
                taskEvaluation
            });
        } else {
            returnNotFound(res, 'Task Evaluation ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Task Evaluation by ID');
    }
}

// Get task evaluations by task
export async function getTaskEvaluationsByTask(req, res) {
    const { taskID } = req.params;
    const active = req.query.active || true;
    try {
        const taskEvaluations = await TaskEvaluation.findAndCountAll({
            attributes: ['taskEvaluationID', 'taskScore', 'scoreHomologation', 'registeredDate', 'unregistered', 'taskEvaluationDate', 'studentDetail', 'isActive', 'agentDetail', 'taskID', 'studentID'],
            where: {
                taskID,
                isActive: active
            },
            include: [{
                model: Task,
                attributes: ['taskID', 'taskCode', 'taskName', 'taskDetail']
            }, {
                model: Student,
                attributes: ['studentID', 'studentCode'],
                include: [{
                    model: Person,
                    attributes: ['personID', 'dni', 'completeName']
                }]
            }]
        });
        if (taskEvaluations.count > 0) {
            return res.status(200).json({
                ok: true,
                taskEvaluations
            });
        } else {
            returnNotFound(res, 'Task ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Task Evaluation by Task');
    }
}

// Update a task evaluation for teacher or admin
export async function updateTaskEvaluation(req, res) {
    const { taskEvaluationID } = req.params;
    const {
        taskScore,
        scoreHomologation,
        taskEvaluationDate,
        //studentDetail,
        //agentDetail,
        taskID,
        studentID
    } = req.body;
    let homologation;
    try {
        const dbTaskEvaluation = await TaskEvaluation.findOne({
            attributes: ['taskEvaluationID', 'taskScore', 'scoreHomologation', 'registeredDate', 'taskEvaluationDate', 'studentDetail', 'isActive', 'agentDetail', 'taskID', 'studentID'],
            where: {
                taskEvaluationID
            }
        });
        if (dbTaskEvaluation === null || dbTaskEvaluation === undefined) {
            returnNotFound(res, 'Task Evaluation ID');
        } else {
            if (taskScore !== undefined || taskScore !== null) {
                homologation = taskScoreHomologation(taskScore);
                if (homologation === 'Error') {
                    return res.status(400).json({
                        ok: false,
                        message: 'Homologation values error, please validate'
                    });

                }
            }
            const updatedTaskEvaluation = await TaskEvaluation.update({
                taskScore,
                scoreHomologation: homologation,
                taskEvaluationDate,
                //studentDetail,
                //agentDetail,
                taskID,
                studentID
            }, {
                where: {
                    taskEvaluationID
                }
            });
            if (updatedTaskEvaluation) {
                return res.status(200).json({
                    ok: true,
                    message: 'Taske Evaluation updated successfully'
                });
            } else {
                returnNotFound(res, 'Task Evaluation ID - not updated');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Task Evaluation');
    }
}

// Update a task evaluation for student or agent
export async function updateTaskEvaluationStudent(req, res) {
    const { taskEvaluationID } = req.params;
    const {
        studentDetail,
        agentDetail
    } = req.body;
    try {
        const dbTaskEvaluation = await TaskEvaluation.findOne({
            attributes: ['taskEvaluationID', 'taskScore', 'scoreHomologation', 'registeredDate', 'unregisteredDate', 'taskEvaluationDate', 'studentDetail', 'isActive', 'agentDetail', 'taskID', 'studentID'],
            where: {
                taskEvaluationID
            }
        });
        if (dbTaskEvaluation === null || dbTaskEvaluation === undefined) {
            returnNotFound(res, 'Task Evaluation ID');
        } else {
            const udpatedTaskEvaluation = await TaskEvaluation.update({
                studentDetail,
                agentDetail
            }, {
                where: {
                    taskEvaluationID
                }
            });
            if (udpatedTaskEvaluation) {
                return res.status(200).json({
                    ok: true,
                    message: 'Task Evaluation updated successfully'
                });
            } else {
                returnNotFound(res, 'Task Evaluation ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Task Evaluation for Student or Agent');
    }
}

// Change activation status to a task evaluation
export async function changeActivationTaskEvaluation(req, res) {
    const { taskEvaluationID } = req.params;
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
        const dbTaskEvaluation = await TaskEvaluation.findOne({
            attributes: ['taskEvaluationID', 'taskScore', 'isActive', 'registeredDate', 'unregisteredDate', 'taskID'],
            where: {
                taskEvaluationID
            }
        });
        if (dbTaskEvaluation) {
            const changeActivation = await TaskEvaluation.update(
                changeActivationJSON, {
                    where: {
                        taskEvaluationID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Task Evaluation ' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Task Evaluation or Task Evaluation already ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Task Evaluation ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Task Evaluation');
    }
}

// Delete a task evaluation
export async function deleteTaskEvaluation(req, res) {
    const { taskEvaluationID } = req.params;
    try {
        const countDeleted = await TaskEvaluation.destroy({
            where: {
                taskEvaluationID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Task Evaluation deleted successfully'
            });
        } else {
            returnNotFound(res, 'Task Evaluation ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Delete Task Evaluation');
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