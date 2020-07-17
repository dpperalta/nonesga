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

// Get all colleges
export async function getColleges(req, res) {
    try {
        const colleges = await College.findAndCountAll({
            attributes: ['collegeID', 'collegeName', 'collegeShowName', 'collegeCode', 'detail', 'flag', 'mainColour', 'secondaryColour',
                'status', 'isActive', 'image', 'logo', 'description', 'registratedDate', 'unregistratedDate', 'lastChangeDate', 'changeDetail', 'lastChangeUser'
            ]
        });
        if (colleges.count > 0) {
            return res.status(200).json({
                ok: true,
                colleges
            })
        } else {
            returnNotFound(res, 'All Colleges');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Colleges');
    }
}

// Change to active or inactive a college
export async function changeActivationCollege(req, res) {
    const { collegeID } = req.params;
    const type = req.query.type;
    let value;
    let action = '';
    let afirmation = '';
    let negation = '';
    let changeActivationJSON;
    if (type === 'Activate' || type === 'activate' || type === 'ACTIVATE') {
        value = true;
        action = 'Activating';
        negation = 'inactive';
        afirmation = 'active';
        changeActivationJSON = {
            isActive: value,
            lastChangeDate: sequelize.literal('CURRENT_TIMESTAMP'),
            changeDetail: 'Set ' + afirmation
        }
    }
    if (type === 'Inactivate' || type === 'inactivate' || type === 'INACTIVATE') {
        value = false;
        action = 'Inactivating';
        negation = 'active';
        afirmation = 'inactive';
        changeActivationJSON = {
            isActive: value,
            unregistratedDate: sequelize.literal('CURRENT_TIMESTAMP'),
            lastChangeDate: sequelize.literal('CURRENT_TIMESTAMP'),
            changeDetail: 'Set ' + afirmation
        }
    }
    try {
        const dbCollege = await College.findOne({
            attributes: ['collegeName', 'isActive', 'unregistratedDate', 'lastChangeDate', 'changeDetail', 'collegeID'],
            where: {
                collegeID
            }
        });
        if (dbCollege) {
            const changeActivation = await College.update(changeActivationJSON, {
                where: {
                    collegeID,
                    isActive: !value
                }
            });
            console.log("change activation:", changeActivation);
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'College ' + type + 'd successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' a College or College already ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, negation + " College");
        }
    } catch (e) {
        console.log('Error');
        returnError(res, e, "Activating/Inactivating College");
    }
}

// Get all active or inactive college
export async function getStatusColleges(req, res) {
    let { type } = req.params;
    let value;
    console.log('Type:', type);
    if (type === 'active') {
        value = true;
    } else {
        if (type === 'inactive') {
            value = false;
        } else {
            return res.status(300).json({
                ok: false,
                message: 'The type is not correct, pealse validate'
            });
        }
    }
    try {
        const colleges = await College.findAndCountAll({
            attributes: ['collegeID', 'collegeName', 'collegeShowName', 'collegeCode', 'detail', 'flag', 'mainColour', 'secondaryColour',
                'status', 'isActive', 'image', 'logo', 'description', 'registratedDate', 'unregistratedDate', 'lastChangeDate', 'changeDetail', 'lastChangeUser'
            ],
            where: {
                isActive: value
            }
        });
        if (colleges.count > 0) {
            return res.status(200).json({
                ok: true,
                colleges
            });
        } else {
            returnNotFound(res, type + ' colleges')
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Active/Inactive Colleges');
    }
}

// Get a college by ID
export async function getCollege(req, res) {
    const { collegeID } = req.params;
    try {
        const college = await College.findOne({
            attributes: ['collegeID', 'collegeName', 'collegeShowName', 'collegeCode', 'detail', 'flag', 'logo', 'status', 'isActive', 'image',
                'registratedDate', 'unregistratedDate', 'mainColour', 'secondaryColour', 'description', 'changeDetail', 'lastChangeDate', 'lastChangeUser'
            ],
            where: {
                collegeID
            }
        });
        if (college) {
            return res.status(200).json({
                ok: true,
                college
            });
        } else {
            returnNotFound(res, 'College ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get College ' + collegeID);
    }
}

// Update a College by collegeID
export async function updateCollege(req, res) {
    const { collegeID } = req.params;
    const {
        collegeName,
        collegeShowName,
        collegeCode,
        detail,
        flag,
        mainColour,
        secondaryColour,
        status,
        image,
        logo,
        description
    } = req.body;
    try {
        const dbCollege = await College.findOne({
            attributes: ['collegeName', 'collegeShowName', 'collegeCode', 'detail', 'flag', 'mainColour', 'secondaryColour', 'status', 'image', 'logo', 'description'],
            where: {
                collegeID
            }
        });
        if (dbCollege) {
            const updateCollege = await College.update({
                collegeName,
                collegeShowName,
                collegeCode,
                detail,
                flag,
                mainColour,
                secondaryColour,
                status,
                image,
                logo,
                description,
                lastChangeDate: sequelize.literal('CURRENT_TIMESTAMP'),
                changeDetail: 'Update College'
            }, {
                where: {
                    collegeID
                }
            });
            if (updateCollege) {
                return res.status(200).json({
                    ok: true,
                    message: 'College updated successfully',
                    count: updateCollege
                });
            }
        } else {
            returnNotFound(res, 'College ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update College');
    }
}

// Delete a college by college id
export async function deleteCollete(req, res){
    const { collegeID } = req.params;
    try{
        const countDeleted = await College.destroy({
            where: {
                collegeID
            }
        });
        if(countDeleted > 0){
            return res.status(200).json({
                ok: true,
                message: 'College deleted successfully'
            });
        }else{
            returnNotFound(res, 'College ID');
        }
    }catch(e){
        console.log('Error:', e);
        returnError(res, e, 'Delete Collete');
    }
}