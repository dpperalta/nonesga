import PhoneOperator from '../models/PhoneOperator';
import { sequelize } from '../database/database';
import { returnNotFound, returnError, returnWrongError } from './errors';

// Create a new Phone Operator
export async function createPhoneOperator(req, res) {
    const {
        operatorName,
        detail,
        smsNumber,
        cost,
        observations
    } = req.body;
    try {
        const newPhoneOperator = await PhoneOperator.create({
            operatorName,
            detail,
            smsNumber,
            cost,
            observations
        }, {
            fields: ['operatorName', 'detail', 'smsNumber', 'cost', 'observations'],
            returning: ['operatorID', 'operatorName', 'detail', 'smsNumber', 'cost', 'observations', 'registeredDate', 'isActive']
        });
        if (newPhoneOperator) {
            return res.status(200).json({
                ok: true,
                message: 'Phone Operator created successfully',
                operator: newPhoneOperator
            });
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Create Phone Operator');
    }
}

// Get all Phone Operators
export async function getPhoneOperators(req, res) {
    const limit = req.query.limit || 25;
    const from = req.query.from || 0;
    try {
        const phoneOperators = await PhoneOperator.findAndCountAll({
            attributes: ['operatorID', 'operatorName', 'detail', 'smsNumber', 'cost', 'observations', 'registeredDate', 'unregisteredDate', 'isActive'],
            limit,
            offset: from
        });
        if (phoneOperators) {
            return res.status(200).json({
                ok: true,
                phoneOperators
            });
        } else {
            returnNotFound(res, 'Any Phone Operator');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Phone Operators');
    }
}

// Get the information of a Phone Operator by ID
// Get information of a city
export async function getPhoneOperator(req, res) {
    const { operatorID } = req.params;
    try {
        const phoneOperator = await PhoneOperator.findOne({
            attributes: ['operatorID', 'operatorName', 'detail', 'smsNumber', 'cost', 'observations', 'registeredDate', 'unregisteredDate', 'isActive'],
            where: {
                operatorID
            }
        });
        if (phoneOperator) {
            return res.status(200).json({
                ok: true,
                phoneOperator
            });
        } else {
            returnNotFound(res, 'Phone Operator ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Get Phone Operator by ID');
    }
}

// Change to active or inactive to a phone operator
export async function changeActivationPhoneOperator(req, res) {
    const { operatorID } = req.params;
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
        const dbPhoneOperator = await PhoneOperator.findOne({
            attributes: ['operatorID', 'operatorName', 'isActive', 'registeredDate', 'unregisteredDate'],
            where: {
                operatorID
            }
        });
        if (dbPhoneOperator) {
            const changeActivation = await PhoneOperator.update(
                changeActivationJSON, {
                    where: {
                        operatorID,
                        isActive: !value
                    }
                }
            );
            if (changeActivation > 0) {
                return res.status(200).json({
                    ok: true,
                    message: 'Phone Operator ' + type.toLowerCase() + 'd successfully'
                });
            } else {
                return res.status(404).json({
                    ok: false,
                    message: 'Error while ' + action + ' a Phone Operator or Phone Operator already ' + afirmation,
                    error: 'Error 0'
                });
            }
        } else {
            returnNotFound(res, 'Phone Operator ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Change Activation Phone Operator');
    }
}

// Update a Phone Operator
export async function updatePhoneOperator(req, res) {
    const { operatorID } = req.params;
    const {
        operatorName,
        detail,
        smsNumber,
        cost,
        observations
    } = req.body;
    try {
        const dbPhoneOperator = await PhoneOperator.findOne({
            attributes: ['operatorID', 'operatorName', 'detail', 'smsNumber', 'cost', 'observations', 'registeredDate', 'unregisteredDate', 'isActive'],
            where: {
                operatorID
            }
        });

        if (dbPhoneOperator === null || dbPhoneOperator === undefined) {
            returnNotFound(res, 'Phone Operator ID');
        } else {
            const updatedPhoneOperator = await PhoneOperator.update({
                operatorName,
                detail,
                smsNumber,
                cost,
                observations
            }, {
                where: {
                    operatorID
                }
            });
            if (updatedPhoneOperator) {
                return res.status(200).json({
                    ok: true,
                    message: 'Phone Operator updated successfully'
                });
            } else {
                returnNotFound(res, 'Phone Operator ID');
            }
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Update Phone Operator');
    }
}

// Delte a Phone Operator
export async function deletePhoneOperator(req, res) {
    const { operatorID } = req.params;
    try {
        const countDeleted = await PhoneOperator.destroy({
            where: {
                operatorID
            }
        });
        if (countDeleted > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Phone Operator deleted successfuylly'
            });
        } else {
            returnNotFound(res, 'Phone Operator ID');
        }
    } catch (e) {
        console.log('Error:', e);
        returnError(res, e, 'Delete Phone Operator');
    }
}