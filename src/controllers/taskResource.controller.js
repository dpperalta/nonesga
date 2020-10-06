import TaskResource from '../models/TaskResource';
import Task from '../models/Task';
import { sequelize } from '../database/database';
import { returnError, returnNotFound } from './errors';

// Create a new TaskResource
export async function createTaskResource(req, res) {
    const {
        resourceName,
        resourceType,
        resourceDetail,
        resource,
        taskID
    } = req.body;

    try {
        const newTaskResource = await TaskResource.create({
            resourceName,
            resourceType,
            resourceDetail,
            resource,
            taskID
        }, {
            fields: ['resourceName', 'resourceType', 'resourceDetail', 'resource', 'taskID'],
            returning: ['taskResourceID', 'resourceName', 'resourceType', 'resourceDetail', 'resource', 'isActive', 'registeredDate', 'unregisteredDate', 'taskID']
        });
        if (newTaskResource) {
            return res.status(200).json({
                ok: true,
                message: 'Task Resource created successfully',
                taskResource: newTaskResource
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Task Resource');
    }
}

// Get all tasksResources
export async function getTaskResources(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    const active = req.query.active || true;
    try {
        const taskResources = await TaskResource.findAndCountAll({
            attributes: ['taskResourceID', 'resourceName', 'resourceType', 'resourceDetail', 'resource', 'isActive', 'registeredDate', 'unregisteredDate', 'taskID'],
            where: {
                isActive: active
            },
            include: [{
                model: Task,
                attributes: ['taskID', 'taskCode', 'taskName', 'taskDetail']
            }],
            limit,
            offset: from
        });
        if (taskResources.count > 0) {
            return res.status(200).json({
                ok: true,
                taskResources
            });
        } else {
            returnNotFound(res, 'Any Task Resource');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get all Task Resources');
    }
}

// Get a Task Resource by ID
export async function getTaskResource(req, res) {
    const { taskResourceID } = req.params;
    try {
        const taskResource = await TaskResource.findOne({
            attributes: ['taskResourceID', 'resourceName', 'resourceType', 'resourceDetail', 'resource', 'isActive', 'registeredDate', 'unregisteredDate', 'taskID'],
            where: {
                taskResourceID
            },
            include: [{
                model: Task,
                attributes: ['taskID', 'taskCode', 'taskName', 'taskDetail']
            }]
        });
        if (taskResource) {
            return res.status(200).json({
                ok: true,
                taskResource
            });
        } else {
            returnNotFound(res, 'Task Resource ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get a Task Resource by ID');
    }
}

// Get all task resources by task
export async function getTaskResourcesByTask(req, res) {
    const { taskID } = req.params;
    const active = req.query.active || true;
    try {
        const taskResources = await TaskResource.findAndCountAll({
            attributes: ['taskResourceID', 'resourceName', 'resourceType', 'resourceDetail', 'resource', 'isActive', 'registeredDate', 'unregisteredDate', 'taskID'],
            where: {
                taskID,
                isActive: active
            },
            include: [{
                model: Task,
                attributes: ['taskID', 'taskCode', 'taskName', 'taskDetail']
            }]
        });
        if (taskResources.count > 0) {
            return res.status(200).json({
                ok: true,
                taskResources
            });
        } else {
            returnNotFound(res, 'Task ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Task Resoruces by Task');
    }
}

// Update a task resource
export async function updateTaskResource(req, res) {
    const { taskResourceID } = req.params;
    const {
        resourceName,
        resourceType,
        resourceDetail,
        resource,
        taskID
    } = req.body;
    try {
        const dbTaskResource = await TaskResource.findOne({
            attributes: ['taskResourceID', 'resourceName', 'resourceType', 'resourceDetail', 'resource', 'isActive', 'registeredDate', 'unregisteredDate', 'taskID'],
            where: {
                taskResourceID
            }
        });
        if (dbTaskResource === null || dbTaskResource === undefined) {
            returnNotFound(res, 'Task Resource ID');
        } else {
            const updatedTaskResource = await TaskResource.update({
                resourceName,
                resourceType,
                resourceDetail,
                resource,
                taskID
            }, {
                where: {
                    taskResourceID
                }
            });
            if (updateTaskResource) {
                return res.status(200).json({
                    ok: true,
                    message: 'Task Resource updated successfully'
                });
            } else {
                returnNotFound(res, 'Task Resource ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Task Resource');
    }
}

// Change to active or inactive a task resource
export async function changeActivationTaskResource(req, res) {
    const { taskResourceID } = req.params;
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
        const dbTaskResource = await TaskResource.findOne({
            attributes: ['taskResourceID', 'resourceName', 'isActive', 'registeredDate', 'unregisteredDate', 'taskID'],
            where: {
                taskResourceID
            }
        });
        if (dbTaskResource) {
            const changeActivation = await TaskResource.update(
                changeActivationJSON, {
                    where: {
                        taskResourceID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Task Resource ' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Task Resource or Task Resource alread ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Task Resource ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Task Resource');
    }
}

// Delte a task resource
export async function deleteTaskResource(req, res) {
    const { taskResourceID } = req.params;
    try {
        const countDeleted = await TaskResource.destroy({
            where: {
                taskResourceID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Task Resource deleted successfully'
            });
        } else {
            returnNotFound(res, 'Task Resource ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Delete Task Resource');
    }
}