import TaskResolutionResource from '../models/TaskResolutionResource';
import TaskResolution from '../models/TaskResolution';
import { sequelize } from '../database/database';
import { returnError, returnNotFound, returnWrongError } from './errors';
import Task from '../models/Task';

// Create a new Task Resolution Resource
export async function createTaskResolutionResource(req, res) {
    const {
        resourceName,
        details,
        resource,
        resolutionID
    } = req.body;
    try {
        const newTaskResolutionResource = await TaskResolutionResource.create({
            resourceName,
            details,
            resource,
            updatedDate: sequelize.literal('CURRENT_TIMESTAMP'),
            resolutionID
        }, {
            fields: ['resourceName', 'details', 'updatedDate', 'resource', 'resolutionID'],
            returning: ['resourceID', 'resourceName', 'details', 'resource', 'isActive', 'registeredDate', 'unregisteredDate', 'updatedDate', 'resolutionID']
        });
        if (newTaskResolutionResource) {
            return res.status(200).json({
                ok: true,
                message: 'Task Resolution Resource created successfully',
                taskResolutionResourse: newTaskResolutionResource
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Task Resolution Resource');
    }
}

// Get all task resolution resources
export async function getTaskResolutionResources(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    //const active = req.query.active || true;
    try {
        const taskResolutionResourses = await TaskResolutionResource.findAndCountAll({
            attributes: ['resourceID', 'resourceName', 'details', 'resource', 'isActive', 'registeredDate', 'unregisteredDate', 'updatedDate', 'resolutionID'],
            /* where: {
                 isActive: active
             },*/
            include: [{
                model: TaskResolution,
                attributes: ['resolutionID', 'isActive', 'detail', 'isPublished', 'publishedDate'],
                include: [{
                    model: Task,
                    attributes: ['taskID', 'taskCode', 'taskName', 'taskDetail']
                }]
            }],
            limit,
            offset: from
        });
        if (taskResolutionResourses.count > 0) {
            return res.status(200).json({
                ok: true,
                taskResolutionResourses
            });
        } else {
            returnNotFound(res, 'Any Task Resolution Resource');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get all Task Resolution Resources');
    }
}

// Get a Task Resolution Resource by ID
export async function getTaskResolutionResourceByID(req, res) {
    const { resourceID } = req.params;
    try {
        const taskResolutionResource = await TaskResolutionResource.findOne({
            attributes: ['resourceID', 'resourceName', 'details', 'resource', 'isActive', 'registeredDate', 'unregisteredDate', 'updatedDate', 'resolutionID'],
            where: {
                resourceID
            },
            include: [{
                model: TaskResolution,
                attributes: ['resolutionID', 'isActive', 'detail', 'isPublished', 'publishedDate'],
                include: [{
                    model: Task,
                    attributes: ['taskID', 'taskCode', 'taskName', 'taskDetail']
                }]
            }]
        });
        if (taskResolutionResource) {
            return res.status(200).json({
                ok: true,
                taskResolutionResource
            });
        } else {
            returnNotFound(res, 'Task Resolutoin Resource ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Task Resolution Resource by ID');
    }
}

// Get all task resolution resources by task resolution
export async function getTaskResolutionResourceByTaskResolution(req, res) {
    const { resolutionID } = req.params;
    try {
        const taskResolutionResources = await TaskResolutionResource.findAndCountAll({
            attributes: ['resourceID', 'resourceName', 'details', 'resource', 'isActive', 'registeredDate', 'unregisteredDate', 'updatedDate', 'resolutionID'],
            where: {
                resolutionID
            },
            include: [{
                model: TaskResolution,
                attributes: ['resolutionID', 'isActive', 'detail', 'isPublished', 'publishedDate'],
                include: [{
                    model: Task,
                    attributes: ['taskID', 'taskCode', 'taskName', 'taskDetail']
                }]
            }]
        });
        if (taskResolutionResources) {
            return res.status(200).json({
                ok: true,
                taskResolutionResources
            });
        } else {
            returnNotFound(res, 'Task Resolutoin ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Task Resolution Resource by Task Resolution');
    }
}

// Update a task resolution resource
export async function updateTaskResolutionResource(req, res) {
    const { resourceID } = req.params;
    const {
        resourceName,
        details,
        resource,
        resolutionID
    } = req.body;
    try {
        const dbTaskResolutionResourceResource = await TaskResolutionResource.findOne({
            attributes: ['resourceID', 'resourceName', 'details', 'resource', 'isActive', 'registeredDate', 'unregisteredDate', 'updatedDate', 'resourceID'],
            where: {
                resourceID
            }
        });
        if (dbTaskResolutionResourceResource === null || dbTaskResolutionResourceResource === undefined) {
            returnNotFound(re, 'Task Resolution Resource ID');
        } else {
            const updatedTaskResolutionResource = await TaskResolutionResource.update({
                resourceName,
                details,
                resource,
                updatedDate: sequelize.literal('CURRENT_TIMESTAMP'),
                resolutionID
            }, {
                where: {
                    resourceID
                }
            });
            if (updatedTaskResolutionResource) {
                return res.status(200).json({
                    ok: true,
                    message: 'Task Resoluton Resource updated successfully'
                });
            } else {
                returnNotFound(res, 'Task Resolution Resource ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Task Resolution Resource');
    }
}

// Change activation status of a task resolution resource
export async function changeActivationTaskResolutionResource(req, res) {
    const { resourceID } = req.params;
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
                updatedDate: sequelize.literal('CURRENT_TIMESTAMP')
            }
        } else {
            returnWrongError(res, 'type', 'request');
        }
    }
    try {
        const dbTaskResolutionResourceA = await TaskResolutionResource.findOne({
            attributes: ['resourceID', 'resourceName', 'details', 'resource', 'isActive', 'registeredDate', 'unregisteredDate', 'updatedDate', 'resolutionID'],
            where: {
                resourceID
            }
        });
        if (dbTaskResolutionResourceA) {
            const changeActivation = await TaskResolutionResource.update(
                changeActivationJSON, {
                    where: {
                        resourceID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Task Resolution Resource ' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Task Resolution or Task Resolution Resource already ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Task Resolution Resource ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Task Resolution Resource');
    }
}

// Delete a Task Resolution Resource
export async function deleteTaskResolutionResource(req, res) {
    const { resourceID } = req.params;
    try {
        const countDeleted = await TaskResolutionResource.destroy({
            where: {
                resourceID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Task Resolution Resource deleted successfully'
            });
        } else {
            returnNotFound(res, 'Task Resolution ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Delete Task Resolution Resource');
    }
}