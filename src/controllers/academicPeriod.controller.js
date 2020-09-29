import AcademicPeriod from '../models/AcademicPeriod';
import { sequelize } from '../database/database';
import { returnError, returnNotFound } from './errors';

// Create a new Academic Period
export async function createAcademicPeriod(req, res) {
    const {
        startPeriod,
        endPeriod,
        periodName,
        detail
    } = req.body;
    try {
        let newAcademicPeriod = await AcademicPeriod.create({
            startPeriod,
            endPeriod,
            periodName,
            detail
        }, {
            fields: ['startPeriod', 'endPeriod', 'periodName', 'detail'],
            returning: ['periodID', 'startPeriod', 'endPeriod', 'periodName', 'isActive', 'registeredDate', 'unregisteredDate', 'detail']
        });
        if (newAcademicPeriod) {
            return res.status(200).json({
                ok: true,
                message: 'Academic Period created successfully',
                academicPeriod: newAcademicPeriod
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Academic Period');
    }
}

// Get all Academic Periods
export async function getAcademicPeriods(req, res) {
    const limit = req.params.limit || 25;
    const from = req.params.from || 0;
    try {
        const academicPeriods = await AcademicPeriod.findAndCountAll({
            attributes: ['periodID', 'startPeriod', 'endPeriod', 'periodName', 'isActive', 'registeredDate', 'unregisteredDate', 'detail'],
            limit,
            offset: from
        });
        if (academicPeriods.count > 0) {
            return res.status(200).json({
                ok: true,
                academicPeriods
            });
        } else {
            returnNotFound(res, 'Any Academic Period');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get all Academic Periods');
    }
}

// Get information of an Academic Period
export async function getAcademicPeriod(req, res) {
    const { periodID } = req.params;
    try {
        const academicPeriod = await AcademicPeriod.findOne({
            attributes: ['periodID', 'startPeriod', 'endPeriod', 'periodName', 'isActive', 'registeredDate', 'unregisteredDate', 'detail'],
            where: {
                periodID
            }
        });
        if (academicPeriod) {
            return res.status(200).json({
                ok: true,
                academicPeriod
            });
        } else {
            returnNotFound(res, 'Period ID');
        }
    } catch (e) {
        console.log('Error: ', e);
        returnError(res, e, 'Get an Academic Period');
    }
}

// Change to active or inactive an Academic Period
export async function changeActivationAcademicPeriod(req, res) {
    const { periodID } = req.params;
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
        const dbAcademicPeriod = await AcademicPeriod.findOne({
            attributes: ['periodID', 'periodName', 'isActive', 'unregisteredDate', 'registeredDate'],
            where: {
                periodID
            }
        });
        if (dbAcademicPeriod) {
            const changeActivation = await AcademicPeriod.update(
                changeActivationJSON, {
                    where: {
                        periodID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Academic Period ' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Academic Period or Academic Period already ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Subject ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Academic Period');
    }
}

// Update an Academic Period
export async function updateAcademicPeriod(req, res) {
    const { periodID } = req.params;
    const {
        startPeriod,
        endPeriod,
        periodName,
        detail
    } = req.body;
    try {
        const dbAcademicPeriod = await AcademicPeriod.findOne({
            attributes: ['periodID', 'startPeriod', 'endPeriod', 'periodName', 'isActive', 'registeredDate', 'unregisteredDate', 'detail'],
            where: {
                periodID
            }
        });
        if (dbAcademicPeriod === null || dbAcademicPeriod === undefined) {
            returnNotFound(res, 'Period ID');
        } else {
            const updateAcademicPeriod = await AcademicPeriod.update({
                startPeriod,
                endPeriod,
                periodName,
                detail
            }, {
                where: {
                    periodID
                }
            });
            if (updateAcademicPeriod) {
                return res.status(200).json({
                    ok: true,
                    message: 'Academic Period udated successfully'
                });
            } else {
                returnNotFound(res, 'Period ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Academic Period');
    }
}

// Delete an Academic Period
export async function deleteAcademicPeriod(req, res) {
    const { periodID } = req.params;
    try {
        const countDeleted = await AcademicPeriod.destroy({
            where: {
                periodID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Academic Period deleted successfully'
            });
        } else {
            returnNotFound(res, 'Period ID');
        }
    } catch (e) {
        returnError(res, e, 'Delete Academic Period');
    }
}