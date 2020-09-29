import EnrollmentStatus from '../models/EnrollmentStatus';
import { sequelize } from '../database/database';
import { returnError, returnWrongError, returnNotFound } from './errors';

// Create new Enrollment Status
export async function createEnrollmentStatus(req, res) {
    const {
        code,
        description,
        detail
    } = req.body;
    try {
        let newEnrollmentStatus = await EnrollmentStatus.create({
            code,
            description,
            detail
        }, {
            fields: ['code', 'description', 'detail'],
            returning: ['statusID', 'code', 'description', 'isActive', 'detail']
        });
        if (newEnrollmentStatus) {
            return res.status(200).json({
                ok: true,
                message: 'Enrollment Status created successfully',
                enrollmentStatus: newEnrollmentStatus
            });
        }
    } catch (e) {
        console.log('Error: ', e);
        returnError(res, e, 'Create Enrollment Status');
    }
}

// Get all Enrollment Status
export async function getAllEnrollmentStatus(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const allEnrollmentStatus = await EnrollmentStatus.findAndCountAll({
            attributes: ['statusID', 'code', 'description', 'isActive', 'detail'],
            order: [
                ['code', 'ASC']
            ]
        });
        if (allEnrollmentStatus) {
            return res.status(200).json({
                ok: true,
                allEnrollmentStatus
            });
        } else {
            returnNotFound(res, 'Any Enrollment Status');
        }
    } catch (e) {
        console.log('Error: ', e);
        returnError(res, e, 'Get all Enrollment Status');
    }
}

// Update an Enrollment Status
export async function updateEnrollmentStatus(req, res) {
    const { statusID } = req.params;
    const {
        code,
        description,
        detail
    } = req.body;
    try {
        const dbEnrollmentStatus = await EnrollmentStatus.findOne({
            attributes: ['statusID', 'code', 'description', 'isActive', 'detail'],
            where: {
                statusID
            }
        });
        if (dbEnrollmentStatus === null | dbEnrollmentStatus === undefined) {
            returnNotFound(res, 'Status ID');
        } else {
            const updatedEnrollmentStatus = await EnrollmentStatus.update({
                code,
                description,
                detail
            }, {
                where: {
                    statusID
                }
            });
            if (updatedEnrollmentStatus) {
                return res.status(200).json({
                    ok: true,
                    message: 'Enrollment Status updated successfully'
                });
            } else {
                returnNotFound(res, 'Status ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Enrollment Status');
    }
}

// Get information of an enrollment status by ID
export async function getEnrollmentStatus(req, res) {
    const { statusID } = req.params;
    try {
        const enrollmentStatus = await EnrollmentStatus.findOne({
            attributes: ['statusID', 'code', 'description', 'isActive', 'detail'],
            where: {
                statusID
            }
        });
        if (enrollmentStatus) {
            return res.status(200).json({
                ok: true,
                enrollmentStatus
            });
        } else {
            returnNotFound(res, 'Status ID');
        }
    } catch (e) {
        console.log('Error: ', e);
        returnError(res, e, 'Get an Enrollment Status');
    }
}

// Change activation status
export async function changeActivationEnrollmentStatus(req, res) {
    const { statusID } = req.params;
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
            isActive: value,
            unregisteredDate: null
        };
    } else {
        if (type.toLowerCase() === 'inactivate') {
            value = false;
            action = 'Inactivating';
            afirmation = 'inactive';
            negation = 'active';
            changeActivationJSON = {
                isActive: value,
                unregisteredDate: sequelize.literal('CURRENT_TIMESTAMP')
            };
        } else {
            returnWrongError(res, 'type', 'request');
        }
    }
    try {
        const dbEnrollmentStatus = await EnrollmentStatus.findOne({
            attributes: ['statusID', 'code', 'description', 'isActive', 'detail'],
            where: {
                statusID
            }
        });
        if (dbEnrollmentStatus) {
            const changeActivation = await EnrollmentStatus.update(
                changeActivationJSON, {
                    where: {
                        statusID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Enrollment Status ' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(404).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Enrollment Status or Enrollment Status already ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Enrollment Status ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Enrollment Status');
    }
}

// Delete an Enrollment Status
export async function deleteEnrollmentStatus(req, res) {
    const { statusID } = req.params;
    try {
        const countDeleted = await EnrollmentStatus.destroy({
            where: {
                statusID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Enrollment Status deleted successfully'
            });
        } else {
            returnNotFound(res, 'Status ID');
        }
    } catch (e) {
        console.log('Error: ', e);
        returnError(res, e, 'Delete Enrollment Status');
    }
}