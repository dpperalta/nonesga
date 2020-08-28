import Content from '../models/Content'
import { sequelize } from '../database/database';
import { returnError, returnNotFound, returnWrongError } from './errors';
import Subject from '../models/Subject';

// Create new Content
export async function createContent(req, res) {
    const {
        contentCode,
        contentTitle,
        contentDetail,
        image,
        subjectID
    } = req.body;
    try {
        const newContent = await Content.create({
            contentCode,
            contentTitle,
            contentDetail,
            image,
            subjectID
        }, {
            fields: ['contentCode', 'contentTitle', 'contentDetail', 'image', 'subjectID'],
            returning: ['contentID', 'contentCode', 'contentTitle', 'contentDetail', 'registeredDate', 'unregisteredDate', 'image', 'isActive', 'subjectID']
        });
        if (newContent) {
            return res.status(200).json({
                ok: true,
                message: 'Content created successfully',
                content: newContent
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Content');
    }
}

// Get all content
export async function getAllContent(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const contents = await Content.findAndCountAll({
            attributes: ['contentID', 'contentCode', 'contentTitle', 'contentDetail', 'registeredDate', 'unregisteredDate', 'isActive', 'image', 'subjectID'],
            include: [{
                model: Subject,
                attributes: ['subjectID', 'subjectName']
            }],
            limit,
            offset: from
        });
        if (contents) {
            return res.status(200).json({
                ok: true,
                contents
            });
        } else {
            return returnNotFound(res, 'Any Content');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get All Content');
    }
}

// Get all content from a subject
export async function getContentBySubject(req, res) {
    const { subjectID } = req.params;
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const contents = await Content.findAndCountAll({
            attributes: ['contentID', 'contentCode', 'contentTitle', 'contentDetail', 'registeredDate', 'unregisteredDate', 'isActive', 'image', 'subjectID'],
            where: {
                subjectID
            },
            include: [{
                model: Subject,
                attributes: ['subjectID', 'subjectName']
            }],
            limit,
            offset: from
        });
        if (contents) {
            return res.status(200).json({
                ok: true,
                contents
            });
        } else {
            return returnNotFound(res, 'Any Content');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get All Content');
    }
}

// Get all content from a course

// Activate/Inactivate content
export async function changeActivationContent(req, res) {
    const { contentID } = req.params;
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
        const dbContent = await Content.findOne({
            attributes: ['contentID', 'contentCode', 'contentTitle', 'isActive', 'registeredDate', 'unregisteredDate'],
            where: {
                contentID
            }
        });
        if (dbContent) {
            const changeActivation = await Content.update(
                changeActivationJSON, {
                    where: {
                        contentID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Conent ' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Content or Content already ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Content ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Content');
    }
}

// Update Content 
export async function updateContent(req, res) {
    const { contentID } = req.params;
    const {
        contentCode,
        contentTitle,
        contentDetail,
        image,
        subjectID
    } = req.body;
    try {
        const dbContent = await Content.findOne({
            attributes: ['contentID', 'contentCode', 'contentTitle', 'contentDetail', 'isActive', 'registeredDate', 'subjectID'],
            where: {
                contentID
            }
        });
        if (dbContent === null || dbContent === undefined) {
            returnNotFound(res, 'Content ID');
        } else {
            const updatedContent = await Content.update({
                contentCode,
                contentTitle,
                contentDetail,
                image,
                subjectID
            }, {
                where: {
                    contentID
                }
            });
            if (updateContent) {
                return res.status(200).json({
                    ok: true,
                    message: 'Content Updated Successfully'
                });
            } else {
                returnNotFound(res, 'Content ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Content')
    }
}

// Delete Content
export async function deleteContent(req, res) {
    const { contentID } = req.params;
    try {
        const countDeleted = await Content.destroy({
            where: {
                contentID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Content deleted successfully'
            });
        } else {
            returnNotFound(res, 'Content ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Delete Content');
    }
}