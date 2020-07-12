import College from '../models/College';
import { sequelize } from '../database/database';
import { returnNotFound, returnError } from './errors';

// Create a college
export async function createCollege(req, res) {
    const {
        collegeName,
        collegeCode,
        collegeShowName,
        detail,
        image,
        logo,
        flag,
        description
    } = req.body;
    try {
        let newCollege = await College.create({
            collegeName,
            collegeCode,
            collegeShowName,
            detail,
            image,
            logo,
            flag,
            description,
            lastChangeDate: sequelize.literal('CURRENT_TIMESTAMP'),
            changeDetail: 'Create',
            status: 2
        }, {
            fields: ['collegeName', 'collegeCode', 'collegeShowName', 'detail', 'image', 'logo', 'flag', 'description', 'lastChangeDate', 'changeDetail', 'status'],
            returning: ['collegeID', 'collegeName', 'collegeCode', 'collegeShowName', 'detail', 'image', 'logo', 'flag', 'description', 'isActive', 'registratedDate', 'lastChangeDate', 'changeDetail']
        });
        if (newCollege) {
            return res.status(200).json({
                ok: true,
                message: 'College created successfully',
                newCollege
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create College');
    }
}