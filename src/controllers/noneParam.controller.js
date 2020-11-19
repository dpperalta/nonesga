import NoneParam from '../models/NoneParam';
import { sequelize } from '../database/database';
import { returnError, returnNotFound } from './errors';
import { nonesgaLog } from './log4js';
import College from '../models/College';
import NoneModule from '../models/NoneModule';

// Create a Parametrization
export async function createParametrization(req, res) {
    const {
        paramName,
        description,
        isGlobal,
        value,
        rules,
        collegeID,
        moduleID
    } = req.body;
    let paramRules = rules;
    let paramValue = value;
    let messageToSend = '';
    let user = req.user.userID;
    if (paramRules !== undefined) {
        if (paramRules === null || paramRules === '') {
            return res.status(400).json({
                ok: false,
                message: 'A set of rules is required, please validate'
            });
        }
        paramValue = null;
        messageToSend = '- Set of rules';
    } else {
        if (paramValue === undefined || paramValue === null || paramValue === '') {
            return res.status(400).json({
                ok: false,
                message: 'Rules or Value are required, please validate'
            });
        }
        paramRules = null;
        messageToSend = '- Single param value';
    }
    if (isGlobal === false || isGlobal === 'false') {
        if (collegeID === undefined || collegeID === null || collegeID == '') {
            return res.status(400).json({
                ok: false,
                message: 'A College is required to apply parametrization'
            });
        }
    }
    if (!moduleID) {
        return res.status(400).json({
            ok: false,
            message: 'Module or Submodule are required, please validate'
        });
    }
    try {
        const newParametrization = await NoneParam.create({
            paramName,
            description,
            updatedDate: sequelize.literal('CURRENT_TIMESTAMP'),
            updatedUser: user,
            updatedReason: 'Creation of parametrization',
            isGlobal,
            value: paramValue,
            rules: paramRules,
            collegeID,
            moduleID
        }, {
            fields: ['paramName', 'description', 'updatedDate', 'updatedUser', 'updatedReason', 'isGlobal', 'value', 'rules', 'collegeID', 'moduleID'],
            returning: ['paramID', 'paramName', 'description', 'isActive', 'registeredDate', 'unregisteredDate', 'updatedUser', 'updatedDate', 'updatedReason', 'isGlobal', 'value', 'rules', 'collegeID', 'moduleID']
        });
        if (newParametrization) {
            return res.status(200).json({
                ok: true,
                message: 'Parametrization created successfully ' + messageToSend,
                param: newParametrization
            });
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Error while creating parametrization:' + e, 'error');
        returnError(res, e, 'Create Param');
    }
}

// Get all Parametrizations
export async function getParametrizations(req, res) {
    const limit = req.params.limit || 25;
    const from = req.params.from || 0;
    try {
        const params = await NoneParam.findAndCountAll({
            attributes: ['paramID', 'paramName', 'description', 'isActive', 'registeredDate', 'unregisteredDate', 'updatedDate', 'updatedReason', 'updatedUser', 'isGlobal', 'value', 'rules', 'collegeID', 'moduleID'],
            include: [{
                model: College,
                attributes: ['collegeID', 'collegeName']
            }, {
                model: NoneModule,
                attributes: ['moduleID', 'name']
            }],
            limit,
            offset: from
        });
        if (params.count > 0) {
            return res.status(200).json({
                ok: true,
                params
            });
        } else {
            returnNotFound(res, 'Any Params');
        }
    } catch (e) {
        console.log('Error: ', e);
        nonesgaLog('Error while getting params: ' + e, 'error');
        returnError(res, e, 'Get All Params');
    }
}

// Get a Parametrization by ID
export async function getParametrizationByID(req, res) {
    const { paramID } = req.params;
    try {
        const param = await NoneParam.findOne({
            attributes: ['paramID', 'paramName', 'description', 'isActive', 'registeredDate', 'unregisteredDate', 'updatedDate', 'updatedReason', 'updatedUser', 'isGlobal', 'value', 'rules', 'collegeID', 'moduleID'],
            where: {
                paramID
            },
            include: [{
                model: College,
                attributes: ['collegeID', 'collegeName']
            }, {
                model: NoneModule,
                attributes: ['moduleID', 'name']
            }]
        });
        if (param) {
            return res.status(200).json({
                ok: true,
                param
            });
        } else {
            returnNotFound(res, 'Param ID');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Error while getting param by ID: ' + e, 'error');
        returnError(res, e, 'Get Param by ID');
    }
}
// Update a Parametration
export async function updateParametrization(req, res) {
    const { paramID } = req.params;
    const {
        paramName,
        description,
        updatedReason,
        isGlobal,
        value,
        rules,
        collegeID,
        moduleID
    } = req.body;
    let paramValue = value;
    let paramRules = rules;
    let messageToSend;
    if (updatedReason === undefined || updatedReason === null || updatedReason === '') {
        return res.status(400).json({
            ok: false,
            message: 'A reason for update is required, please validate'
        })
    }
    try {
        const dbParams = await NoneParam.findOne({
            attributes: ['paramID', 'paramName', 'description', 'isActive', 'registeredDate', 'unregisteredDate', 'updatedDate', 'updatedReason', 'updatedUser', 'isGlobal', 'value', 'rules', 'collegeID', 'moduleID'],
            where: {
                paramID
            }
        });
        if (dbParams === undefined || dbParams === null) {
            returnNotFound(res, 'Param ID');
        } else {
            if (paramValue != undefined) {
                if (paramValue !== '' || paramValue !== null) {
                    paramRules = null;
                    messageToSend = 'Param value modified';
                }
            } else {
                if (paramRules !== undefined || paramRules !== null || paramRules !== '') {
                    paramValue = null;
                    messageToSend = 'Param rules modified';
                }
            }
            try {
                const updatedParam = await NoneParam.update({
                    paramName,
                    description,
                    updatedDate: sequelize.literal('CURRENT_TIMESTAMP'),
                    updatedReason,
                    updatedUser: req.user.userID,
                    isGlobal,
                    value: paramValue,
                    rules: paramRules,
                    collegeID,
                    moduleID
                }, {
                    where: {
                        paramID
                    }
                });
                if (updatedParam) {
                    return res.status(200).json({
                        ok: true,
                        message: 'Param updated successfully ' + messageToSend
                    });
                } else {
                    returnNotFound(res, 'Param ID');
                }
            } catch (e) {
                console.log('Error:', e);
                nonesgaLog('Error while updating params ' + e, 'error');
                returnError(res, e, 'Update Params');
            }
        }
    } catch (e) {

    }
}

// Change to inactive a Param
export async function changeActivationParam(req, res) {
    const { paramID } = req.params;
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
            unregisteredDate: null,
            updatedUser: req.user.userID,
            updatedReason: 'Activation of the Param',
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
                updatedUser: req.user.userID,
                updatedReason: 'Inactivation of the Param',
                updatedDate: sequelize.literal('CURRENT_TIMESTAMP')
            };
        } else {
            returnWrongError(res, 'type', 'request');
        }
    }
    try {
        const dbParam = await NoneParam.findOne({
            attributes: ['paramID', 'paramName', 'description', 'isActive', 'registeredDate', 'unregisteredDate'],
            where: {
                paramID
            }
        });
        if (dbParam) {
            const changeActivation = await NoneParam.update(
                changeActivationJSON, {
                    where: {
                        paramID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Param ' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Param or Param already ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Param ID');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Error while changin activation:' + e, 'error');
        returnError(res, e, 'Change Activation Param');
    }
}

// Delete a Parametrization
export async function deleteParametrization(req, res) {
    const { paramID } = req.params;
    try {
        const countDeleted = await NoneParam.destroy({
            where: {
                paramID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: false,
                message: 'Param deleted successfully'
            });
        } else {
            returnNotFound(res, 'Param ID');
        }
    } catch (e) {
        console.log('Error:', e);
        nonesgaLog('Error while deleting param: ' + e, 'error');
        returnError(res, e, 'Delete Param');
    }
}