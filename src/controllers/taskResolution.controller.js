import TaskResolution from '../models/TaskResolution';
import Task from '../models/Task';
import Student from '../models/Student';
import Person from '../models/Person';
import { sequelize } from '../database/database';
import { returnError, returnNotFound, returnWrongError } from './errors';

// Create new Task Resolution
export async function createTaskResolution(req, res) {
    const {
        detail,
        isPublished,
        taskID,
        studentID
    } = req.body;
    try {
        const newTaskResolution = await TaskResolution.create({
            detail,
            isPublished,
            updatedDate: sequelize.literal('CURRENT_TIMESTAMP'),
            publishedDate: isPublished ? sequelize.literal('CURRENT_TIMESTAMP') : null,
            taskID,
            studentID
        }, {
            fields: ['detail', 'isPublished', 'updatedDate', 'publishedDate', 'taskID', 'studentID'],
            returning: ['resolutionID', 'isActive', 'detail', 'registeredDate', 'unregisteredDate', 'isPublished', 'publishedDate', 'taskID', 'studentID']
        });
        if (newTaskResolution) {
            return res.status(200).json({
                ok: true,
                message: 'Task Resolution created successfully',
                taskResolution: newTaskResolution
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Task Resolution');
    }
}

// Get all task resolutions
export async function getTaskResolutions(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    const active = req.query.active || true;
    try {
        const taskResolutions = await TaskResolution.findAndCountAll({
            attributes: ['resolutionID', 'isActive', 'detail', 'registeredDate', 'unregisteredDate', 'publishedDate', 'isPublished', 'taskID', 'studentID'],
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
            }],
            limit,
            offset: from
        });
        if (taskResolutions.count > 0) {
            return res.status(200).json({
                ok: true,
                taskResolutions
            });
        } else {
            returnNotFound(res, 'Any Task Resolution');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Task Resolution');
    }
}

// Get a Task Resolution by ID
export async function getTaskResolutionByID(req, res) {
    const { resolutionID } = req.params;
    try {
        const taskResolution = await TaskResolution.findOne({
            attributes: ['resolutionID', 'isActive', 'detail', 'registeredDate', 'unregisteredDate', 'publishedDate', 'updatedDate', 'isPublished', 'taskID', 'studentID'],
            where: {
                resolutionID
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
        if (taskResolution) {
            return res.status(200).json({
                ok: true,
                taskResolution
            });
        } else {
            returnNotFound(res, 'Task Resolution ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get a Task Resolution by ID');
    }
}

// Get all Task Resolution by Task
export async function getTaskResolutionByTask(req, res) {
    const { taskID } = req.params;
    const active = req.query.active || true;
    try {
        const taskResolutions = await TaskResolution.findAndCountAll({
            attributes: ['resolutionID', 'isActive', 'detail', 'registeredDate', 'unregisteredDate', 'publishedDate', 'updatedDate', 'isPublished', 'taskID', 'studentID'],
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
        if (taskResolutions.count > 0) {
            return res.status(200).json({
                ok: true,
                taskResolutions
            });
        } else {
            returnNotFound(res, 'Task Resolution ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Task Resolution by Task');
    }
}

// Update a task resolution
export async function updateTaskResolution(req, res) {
    const { resolutionID } = req.params;
    const {
        detail,
        isPublished,
        studentID
    } = req.body
    try {
        const dbTaskResolution = await TaskResolution.findOne({
            attributes: ['resolutionID', 'isActive', 'detail', 'registeredDate', 'unregisteredDate', 'updatedDate', 'publishedDate', 'isPublished', 'taskID', 'studentID'],
            where: {
                resolutionID
            }
        });
        if (dbTaskResolution === null || dbTaskResolution === undefined) {
            returnNotFound(res, 'Task Resolution ID');
        } else {
            const updatedTaskResolution = await TaskResolution.update({
                detail,
                isPublished,
                studentID,
                publishedDate: isPublished ? sequelize.literal('CURRENT_TIMESTAMP') : null,
                updatedDate: sequelize.literal('CURRENT_TIMESTAMP')
            }, {
                where: {
                    resolutionID
                }
            });
            if (updatedTaskResolution) {
                return res.status(200).json({
                    ok: true,
                    message: 'Task Resolution updated successfully'
                });
            } else {
                returnNotFound(res, 'Task Resolution ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Task Resolution');
    }
}

// Change activation status to a task Resolution
export async function changeActivationTaskResolution(req, res) {
    const { resolutionID } = req.params;
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
            unregisteredDate: null,
            updatedDate: sequelize.literal('CURRENT_TIMESTAMP')
        };
    } else {
        if (type.toLowerCase() === 'inactivate') {
            value = false;
            action = 'Inactivating';
            afirmation = 'inactive';
            negation = 'active';
            changeActivationJSON = {
                isActive: false,
                unregisteredDate: sequelize.literal('CURRENT_TIMESTAMP'),
                isPublished: false,
                publishedDate: null,
                updatedDate: sequelize.literal('CURRENT_TIMESTAMP')
            }
        } else {
            returnWrongError(res, 'type', 'request');
        }
    }
    try {
        const dbTaskResolution = await TaskResolution.findOne({
            attributes: ['resolutionID', 'detail', 'isActive', 'registeredDate', 'unregisteredDate', 'taskID', 'studentID'],
            where: {
                resolutionID
            }
        });
        if (dbTaskResolution) {
            const changeActivation = await TaskResolution.update(
                changeActivationJSON, {
                    where: {
                        resolutionID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Task Resolution ' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Task Resolution or Task Resolution already ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Task Resolution ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Task Resolution');
    }
}

// Delete a task resolution
export async function deleteTaskResolution(req, res) {
    const { resolutionID } = req.params;
    try {
        const countDeleted = await TaskResolution.destroy({
            where: {
                resolutionID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Task Resolution deleted successfully'
            });
        } else {
            returnNotFound(res, 'Task Resolution ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Delete Task Resolution');
    }
}