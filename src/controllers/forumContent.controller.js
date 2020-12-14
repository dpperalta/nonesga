import ForumContent from '../models/ForumContent';
import { sequelize } from '../database/database';
import { returnError, returnNotFound } from './errors';
import { nonesgaLog } from './log4js';
import Forum from '../models/Forum';

// Create Forum Content
export async function createForumContent(req, res) {
    const {
        forumContent,
        details,
        forumID
    } = req.body;
    try {
        const newForumContent = await ForumContent.create({
            forumContent,
            details,
            forumID
        }, {
            fields: ['forumContent', 'details', 'forumID'],
            returning: ['forumContentID', 'registeredDate', 'unregisteredDate', 'isActive', 'forumContent', 'details', 'forumID']
        });
        if (newForumContent) {
            return res.status(200).json({
                ok: true,
                message: 'Forum Content created successfully',
                forumContent: newForumContent
            });
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Create Forum Contenct', 'error');
        returnError(res, e, 'Create Forum Content');
    }
}

// Get all forum content
export async function getForumContents(req, res) {
    const limit = req.params.limit || 25;
    const from = req.params.from || 0;
    try {
        const forumContents = await ForumContent.findAndCountAll({
            attributes: ['forumContentID', 'registredDate', 'unregisteredDate', , 'isActive', 'forumContent', 'details', 'forumID'],
            include: [{
                model: Forum,
                attributes: ['forumID', 'forumName', 'isAcademic']
            }],
            limit,
            offset: from
        });
        if (forumContents.count > 0) {
            return res.status(200).json({
                ok: true,
                forumContents
            });
        } else {
            returnNotFound(res, 'Any Forum Content');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Get all Forum Content', 'error');
        returnError(res, e, 'Get all Forum Content');
    }
}

/*

*/