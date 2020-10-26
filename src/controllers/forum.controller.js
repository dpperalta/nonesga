import Forum from '../models/Forum';
import { sequelize } from '../database/database';
import { returnError, returnNotFound, returnWrongError } from './errors';
import { nonesgaLog } from './log4js';
import Teacher from '../models/Teacher';
import Person from '../models/Person';

// Create a forum
export async function createForum(req, res) {
    const {
        forumName,
        forumDetails,
        isAcademic,
        isQualified,
        calification,
        teacherID
    } = req.body;
    if (isQualified) {
        if (!calification) {
            return res.status(400).json({
                ok: false,
                message: 'Calification is required !!!!'
            });
        }
        if (calification === undefined || calification === null) {
            return res.status(400).json({
                ok: false,
                message: 'Calification is required'
            });
        }
        if (!(!isNaN(parseFloat(calification)) && isFinite(calification))) {
            return res.status(400).json({
                ok: false,
                message: 'The value for califications is not a number'
            });
        }
    }
    try {
        console.log('Entra al try');
        const newForum = await Forum.create({
            forumName,
            forumDetails,
            isAcademic,
            isQualified,
            calification,
            teacherID
        }, {
            fields: ['forumName', 'forumDetails', 'isAcademic', 'isQualified', 'calification', 'teacherID'],
            returning: ['forumID', 'forumName', 'forumDetails', 'registeredDate', 'unregisteredDate', 'isActive', 'isAcademic', 'isQualified', 'calification', 'teacherID']
        });
        if (newForum) {
            return res.status(200).json({
                ok: true,
                message: 'Forum created successfully',
                forum: newForum
            });
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Create a Forum: ' + e, 'error');
        returnError(res, e, 'Create Forum');
    }
}

// Get all forums
export async function getForums(req, res) {
    const limit = req.params.limit || 25;
    const from = req.params.from || 0;
    try {
        const forums = await Forum.findAndCountAll({
            attributes: ['forumID', 'forumName', 'forumDetails', 'registeredDate', 'unregisteredDate', 'isActive', 'isAcademic', 'isQualified', 'calification', 'teacherID'],
            include: [{
                model: Teacher,
                attributes: ['teacherID', 'teacherCode', 'bio', 'details', 'ratting'],
                include: [{
                    model: Person,
                    attributes: ['personID', 'completeName']
                }]
            }],
            limit,
            offset: from
        });
        if (forums.count > 0) {
            return res.status(200).json({
                ok: true,
                forums
            });
        } else {
            returnNotFound(res, 'Any Forum');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Get All Forums: ' + e, 'error');
        returnError(res, e, 'Get all Forums');
    }
}

// Get a Forum by ID
export async function getForumByID(req, res) {
    const { forumID } = req.params;
    try {
        const dbForum = await Forum.findOne({
            attributes: ['forumID', 'forumName', 'forumDetails', 'registeredDate', 'unregisteredDate', 'isActive', 'isAcademic', 'isQualified', 'calification', 'teacherID'],
            where: {
                forumID
            },
            include: [{
                model: Teacher,
                attributes: ['teacherID', 'teacherCode', 'bio', 'details', 'ratting'],
                include: [{
                    model: Person,
                    attributes: ['personID', 'completeName']
                }]
            }]
        });
        if (dbForum) {
            return res.status(200).json({
                ok: true,
                forum: dbForum
            });
        } else {
            returnNotFound(res, 'Forum ID');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Get Forum by ID: ' + e, 'error');
        returnError(res, e, 'Get Forum by ID');
    }
}

// Update a Forum
export async function updateForum(req, res) {
    const { forumID } = req.params;
    const {
        forumName,
        forumDetails,
        isAcademic,
        isQualified,
        calification,
        teacherID
    } = req.body;
    try {
        const dbForum = await Forum.findOne({
            attributes: ['forumID', 'forumName', 'forumDetails'],
            where: {
                forumID
            }
        });
        if (dbForum === null || dbForum === undefined) {
            returnNotFound(res, 'Forum ID');
        } else {
            const updatedForum = await Forum.update({
                forumName,
                forumDetails,
                isAcademic,
                isQualified,
                calification,
                teacherID
            }, {
                where: {
                    forumID
                }
            });
            if (updatedForum) {
                return res.status(200).json({
                    ok: true,
                    message: 'Forum updated successfully'
                });
            }
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Error updating forum: ', e, 'error');
        returnError(res, e, 'Update Forum');
    }
}

// Change to active or inactive a Forum
export async function changeActivationForum(req, res) {
    const { forumID } = req.params;
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
        const dbForum = await Forum.findOne({
            attributes: ['forumID', 'forumName', 'forumDetails', 'isActive', 'registeredDate', 'unregisteredDate'],
            where: {
                forumID
            }
        });
        if (dbForum) {
            const changeActivation = await Forum.update(
                changeActivationJSON, {
                    where: {
                        forumID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Forum ' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Forum or Forum already ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Forum ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Forum');
    }
}

// Delete a Forum
export async function deleteForum(req, res) {
    const { forumID } = req.params;
    try {
        const countDeleted = await Forum.destroy({
            where: {
                forumID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Forum deleted successfully'
            });
        } else {
            returnNotFound(res, 'Forum ID');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Error deleting forum: ' + e, 'error');
        returnError(res, e, 'Delete Forum');
    }
}

// GET Forum by Teacher
// GET Forum by Student
// GET Forum by Signature