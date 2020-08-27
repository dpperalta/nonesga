import Content from '../models/Content'
import { sequelize } from '../database/database';
import { returnError, returnNotFound, returnWrongError } from './errors';

// Create new Content
export async function createContent(req, res) {
    const {
        contentCode,
        contentDetail,
        image,
        subjectID
    } = req.body;
    try {
        const newContent = await Content.create({
            contentCode,
            contentDetail,
            image,
            subjectID
        }, {
            fields: ['contentCode', 'contentDetail', 'image', 'subjectID'],
            returning: ['contentID', 'contentCode', 'contentDetail', 'registeredDate', 'unregisteredDate', 'image', 'isActive', 'subjectID']
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